import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    mainCategory: { 
      type: String, 
      required: true, 
      enum: [
        'T-Shirt',
        'Shirt',
        'Jeans',
        'Pants',
        'Shorts',
        'Jacket',
        'Sweater',
        'Hoodie',
        'Dress',
        'Skirt',
        'Activewear',
        'Swimwear',
        'Underwear',
        'Socks',
        'Footwear',
        'Accessory'
      ] 
    },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ['In Stock', 'Low Stock', 'Out of Stock'], 
      default: 'In Stock' 
    },
    images: [String],
  },
  { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;