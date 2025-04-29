import express from 'express';
import {
  getAllInventory,
  getInventoryById,
  updateInventoryItem,
} from '../controllers/mainInventoryController.js';

const router = express.Router();

// GET /api/inventory
router.get('/getAll', getAllInventory);

// GET /api/inventory/:id
router.get('/:id', getInventoryById);


// PUT /api/inventory/:id
router.put('/:id', updateInventoryItem);


export default router;
