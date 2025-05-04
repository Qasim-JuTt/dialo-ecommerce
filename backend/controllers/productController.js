const Product = require('../models/productModel');
const path = require('path');
const fs = require('fs');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, minOrder, stock, status } = req.body;
  
      // Insert product into database
      const productId = await Product.create({
        name,
        description,
        price,
        minOrder,
        stock,
        status
      });
  
      // Handle image uploads using multer
      if (req.files && req.files.length > 0) {
        for (const image of req.files) {
          const imagePath = `products/${image.filename}`;
          await Product.addImage(productId, imagePath);
        }
      }
  
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        productId
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: error.message
      });
    }
  };

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    console.log(req.params.id)

    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, minOrder, stock, status } = req.body;
    
    await Product.update(req.params.id, {
      name,
      description,
      price,
      minOrder,
      stock,
      status
    });

    // Handle new image uploads
    if (req.files && req.files.images) {
      const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
      
      for (const image of images) {
        const imagePath = `products/${Date.now()}-${image.name}`;
        const uploadPath = path.join(__dirname, '../uploads', imagePath);
        
        await image.mv(uploadPath);
        await Product.addImage(req.params.id, imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message
    });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    // First get product to delete its images from filesystem
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete images from filesystem
    for (const imagePath of product.images) {
      const fullPath = path.join(__dirname, '../uploads', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Delete from database (images will be deleted automatically due to CASCADE)
    await Product.delete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message
    });
  }
};