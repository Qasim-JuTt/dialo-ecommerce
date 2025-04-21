import Product from '../models/Product.js';
import fs from "fs";
import path from "path";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, minOrder, stock, status } = req.body;
    const imagePaths = req.files.map(file => file.filename);

    const product = new Product({
      name,
      description,
      price,
      minOrder,
      stock,
      status,
      images: imagePaths
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
    const productId = req.params.id; // Get the ID from route params
    const product = await Product.findById(productId); // Fetch the product

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

export const deleteImages = (filenames) => {
  filenames.forEach((filename) => {
    const filePath = path.join("uploads", filename); // Adjust path if needed
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", filePath, err.message);
    });
  });
};

export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Parse existing images from formData (sent as JSON string)
    const existingImages = JSON.parse(req.body.existingImages || "[]");

    // Identify and delete removed images
    const removedImages = product.images.filter(
      (img) => !existingImages.includes(img)
    );
    if (removedImages.length > 0) {
      deleteImages(removedImages); // delete only removed images
    }

    // Prepare final image list
    const newUploadedImages = req.files ? req.files.map((file) => file.filename) : [];
    updatedData.images = [...existingImages, ...newUploadedImages];

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error while updating product" });
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




