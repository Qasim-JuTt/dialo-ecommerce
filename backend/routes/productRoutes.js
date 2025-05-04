const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

// Create a new product
router.post('/create', upload.array('images'), productController.createProduct);

// Get all products
router.get('/getAllProducts', productController.getAllProducts);

// Get single product
router.get('/getProduct/:id', productController.getProduct);

// Update product
router.put('productUpdate/:id', upload.array('images'), productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;