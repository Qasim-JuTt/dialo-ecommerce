import mongoose from 'mongoose';

const mainInventorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['In Stock', 'Low Stock', 'Out of Stock'],
    required: true,
  },
}, {
  timestamps: true,
});

const MainInventory = mongoose.model('MainInventory', mainInventorySchema);
export default MainInventory;
