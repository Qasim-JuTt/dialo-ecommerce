import MainInventory from '../models/MainInventory.js';

// GET all inventory items
export const getAllInventory = async (req, res) => {
  try {
    const inventory = await MainInventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch inventory', error });
  }
};

// GET single inventory item by ID
export const getInventoryById = async (req, res) => {
  try {
    const item = await MainInventory.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};



// UPDATE inventory item
export const updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await MainInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update item', error });
  }

};


