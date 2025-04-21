import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required']
  },
  description: {
    type: String,
    required: [true, 'Product description is required']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  minOrder: {
    type: Number,
    required: [true, 'Minimum order quantity is required']
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required']
  },
  status: {
    type: String,
    required: [true, 'Product status is required']
  },
  images: {
    type: [String],
    required: [true, 'At least one product image is required'],
    validate: {
      validator: arr => arr.length > 0,
      message: 'Images array cannot be empty'
    }
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
