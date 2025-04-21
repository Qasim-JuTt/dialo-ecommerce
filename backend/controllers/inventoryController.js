import Inventory from '../models/Inventory.js';

export const createInventory = async (req, res) => {
  try {
    const { name, color, mainCategory, category, quantity, status } = req.body;

    // Validate required fields
    if (!name || !color || !mainCategory || !category || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate quantity is a positive number
    if (isNaN(quantity) || quantity === '') {
        return res.status(400).json({ message: 'Quantity must be a valid number' });
      }
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const images = req.files.map(file => file.filename);

    const newItem = new Inventory({
      name,
      color,
      mainCategory,
      category,
      quantity: Number(quantity),
      status: status || 'In Stock', // Default to 'In Stock' if not provided
      images,
    });

    await newItem.save();

    res.status(201).json({ 
      message: 'Clothing item created successfully', 
      item: newItem 
    });
  } catch (error) {
    console.error('Error creating inventory item:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        message: 'Validation error',
        errors: messages 
      });
    }

    res.status(500).json({ 
      message: 'Failed to create clothing item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};