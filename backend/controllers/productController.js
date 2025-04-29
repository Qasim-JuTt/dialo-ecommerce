import Product from '../models/Product.js';
import fs from "fs";
import path from "path";


export const createProduct = async (req, res) => {
  try {
    const { name, description, price, minOrder, stock, status, relatedProducts } = req.body;
    const imagePaths = req.files.map(file => file.filename);

    // Ensure relatedProducts is an array of ObjectIds
    const relatedProductIds = relatedProducts || [];

    const product = new Product({
      name,
      description,
      price,
      minOrder,
      stock,
      status,
      images: imagePaths,
      relatedProducts: relatedProductIds  // Handle relatedProducts here
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by createdAt descending
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};


// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId)
      .populate('relatedProducts', 'name price images') // Populate related products, selecting only specific fields
      .exec();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error while fetching product" });
  }
};

// Utility function to delete image files

// Helper function to delete image files
export const deleteImages = (filenames) => {
  filenames.forEach((filename) => {
    const filePath = path.join('uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', filePath, err.message);
        } else {
          console.log('Successfully deleted:', filePath);
        }
      });
    } else {
      console.warn('File not found:', filePath);
    }
  });
};

// Helper function to validate related products
const validateRelatedProducts = async (relatedIds, currentProductId) => {
  try {
    if (!relatedIds || relatedIds.length === 0) return [];

    // Remove current product ID and duplicates
    const uniqueIds = [...new Set(relatedIds.map(id => id.toString()))]
      .filter(id => id !== currentProductId.toString());

    if (uniqueIds.length === 0) return [];

    const existingProducts = await Product.find({
      _id: { $in: uniqueIds }
    }).select('_id');

    const existingIds = existingProducts.map(p => p._id.toString());
    const missingIds = uniqueIds.filter(id => !existingIds.includes(id));

    if (missingIds.length > 0) {
      throw new Error(`Related products not found: ${missingIds.join(', ')}`);
    }

    return uniqueIds;
  } catch (error) {
    console.error('Related products validation failed:', error);
    throw error;
  }
};

export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Parse form data fields
    const {
      name,
      description,
      price,
      minOrder,
      stock,
      status,
      existingImages: existingImagesStr,
      relatedProducts: relatedProductsStr
    } = req.body;

    // Parse JSON strings from form data
    const existingImages = existingImagesStr ? JSON.parse(existingImagesStr) : [];
    const relatedProducts = relatedProductsStr ? JSON.parse(relatedProductsStr) : [];

    // Find the existing product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: 'Product not found' 
      });
    }

    // Handle image updates
    const removedImages = product.images.filter(
      (img) => !existingImages.includes(img)
    );
    
    if (removedImages.length > 0) {
      deleteImages(removedImages);
    }

    // Process new uploaded images
    const newUploadedImages = req.files?.map((file) => file.filename) || [];

    // Prepare the update data
    const updateData = {
      name,
      description,
      price: parseFloat(price),
      minOrder: parseInt(minOrder),
      stock: parseInt(stock),
      status,
      images: [...existingImages, ...newUploadedImages]
    };

    // Validate and process related products
    try {
      updateData.relatedProducts = await validateRelatedProducts(relatedProducts, productId);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    ).populate('relatedProducts', 'name price images');

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false,
        message: 'Validation error',
        errors: error.errors 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }

    return res.status(500).json({ 
      success: false,
      message: 'Server error while updating product',
      error: error.message 
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // Delete associated images
    if (product.images && product.images.length > 0) {
      deleteImages(product.images);
    }

    // Delete product from DB
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};




