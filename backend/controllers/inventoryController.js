import Inventory from '../models/Inventory.js';
import MainInventory from '../models/MainInventory.js';
import fs from 'fs';
import path from 'path';

export const createInventory = async (req, res) => {
  try {
    const { name, color, mainCategory, category, quantity, status } = req.body;

    // Validate required fields
    if (!name || !color || !mainCategory || !category || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (isNaN(quantity) || quantity === '') {
      return res.status(400).json({ message: 'Quantity must be a valid number' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    const images = req.files.map(file => file.filename);

    // Create Inventory item
    const newItem = new Inventory({
      name,
      color,
      mainCategory,
      category,
      quantity: Number(quantity),
      status: status || 'In Stock',
      images,
    });

    await newItem.save();

    // Handle MainInventory create or update
    const existingMainItem = await MainInventory.findOne({ type: mainCategory, category });

    if (existingMainItem) {
      // Update quantity
      existingMainItem.quantity += Number(quantity);

      // Update status based on new quantity
      if (existingMainItem.quantity === 0) {
        existingMainItem.status = 'Out of Stock';
      } else if (existingMainItem.quantity <= 5) {
        existingMainItem.status = 'Low Stock';
      } else {
        existingMainItem.status = 'In Stock';
      }

      await existingMainItem.save();
    } else {
      // Create new MainInventory record
      const newMainItem = new MainInventory({
        type: mainCategory,
        category,
        quantity: Number(quantity),
        status:
          quantity === 0
            ? 'Out of Stock'
            : quantity <= 5
            ? 'Low Stock'
            : 'In Stock',
      });

      await newMainItem.save();
    }

    res.status(201).json({
      message: 'Clothing item created successfully',
      item: newItem,
    });
  } catch (error) {
    console.error('Error creating inventory item:', error);

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        message: 'Validation error',
        errors: messages,
      });
    }

    res.status(500).json({
      message: 'Failed to create clothing item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// fetch all record


export const getAllInventory = async (req, res) => {
  try {
    const { mainCategory, category } = req.params;

    const query = {};
    if (mainCategory) query.mainCategory = mainCategory;
    if (category) query.category = category;

    const items = await Inventory.find(query).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    res.status(500).json({
      message: 'Failed to fetch inventory items',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// Fetch Single Record

export const getSingleInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    res.status(500).json({
      message: 'Failed to fetch inventory item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};



// update Invenotory

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, mainCategory, category, quantity, status } = req.body;

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    const oldMainCategory = item.mainCategory;
    const oldCategory = item.category;

    // Update fields
    if (name) item.name = name;
    if (color) item.color = color;
    if (mainCategory) item.mainCategory = mainCategory;
    if (category) item.category = category;
    if (quantity) item.quantity = Number(quantity);
    if (status) item.status = status;

    // Replace images if new ones are uploaded
    if (req.files && req.files.length > 0) {
      item.images.forEach((filename) => {
        const filePath = path.join('uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      item.images = req.files.map(file => file.filename);
    }

    await item.save();

    // 1. Delete MainInventory if no more items exist with old mainCategory+category
    const remainingOldItems = await Inventory.find({
      mainCategory: oldMainCategory,
      category: oldCategory,
      _id: { $ne: id }
    });

    if (remainingOldItems.length === 0) {
      await MainInventory.deleteOne({
        type: oldMainCategory,
        category: oldCategory,
      });
    } else {
      // Recalculate quantity for the old combo just in case
      const totalOldQty = remainingOldItems.reduce((sum, i) => sum + i.quantity, 0);
      const oldMainInv = await MainInventory.findOne({ type: oldMainCategory, category: oldCategory });
      if (oldMainInv) {
        oldMainInv.quantity = totalOldQty;
        oldMainInv.status = totalOldQty <= 0
          ? 'Out of Stock'
          : totalOldQty < 5
            ? 'Low Stock'
            : 'In Stock';
        await oldMainInv.save();
      }
    }

    // 2. Update or create MainInventory for new mainCategory+category
    const updatedItems = await Inventory.find({ mainCategory, category });
    const totalNewQty = updatedItems.reduce((sum, i) => sum + i.quantity, 0);

    const newMainInv = await MainInventory.findOne({ type: mainCategory, category });
    if (newMainInv) {
      newMainInv.quantity = totalNewQty;
      newMainInv.status = totalNewQty <= 0
        ? 'Out of Stock'
        : totalNewQty < 5
          ? 'Low Stock'
          : 'In Stock';
      await newMainInv.save();
    } else {
      await MainInventory.create({
        type: mainCategory,
        category,
        quantity: totalNewQty,
        status: totalNewQty > 5 ? 'In Stock' : totalNewQty > 0 ? 'Low Stock' : 'Out of Stock',
      });
    }

    res.status(200).json({
      message: 'Inventory item updated successfully',
      item,
    });

  } catch (error) {
    console.error('Error updating inventory item:', error);
    res.status(500).json({
      message: 'Failed to update inventory item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};


// Delete Inventory

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    const { mainCategory, category } = item;

    // Delete images from uploads folder
    if (item.images && item.images.length > 0) {
      item.images.forEach((filename) => {
        const filePath = path.join('uploads', filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    // Delete the inventory item
    await item.deleteOne();

    // Check for remaining items in the same mainCategory + category
    const remainingItems = await Inventory.find({ mainCategory, category });

    if (remainingItems.length === 0) {
      // No remaining items, delete main inventory entry
      await MainInventory.deleteOne({ type: mainCategory, category });
    } else {
      // Update the quantity and status in main inventory
      const totalQty = remainingItems.reduce((sum, i) => sum + i.quantity, 0);
      const mainInv = await MainInventory.findOne({ type: mainCategory, category });

      if (mainInv) {
        mainInv.quantity = totalQty;
        mainInv.status = totalQty <= 0
          ? 'Out of Stock'
          : totalQty < 5
            ? 'Low Stock'
            : 'In Stock';
        await mainInv.save();
      }
    }

    res.status(200).json({
      message: 'Inventory item deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting inventory item:', error);
    res.status(500).json({
      message: 'Failed to delete inventory item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
