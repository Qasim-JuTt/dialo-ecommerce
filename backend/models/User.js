import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    googleId: { type: String, default: null  }, // <-- Add this
    createdAt: { type: Date, default: Date.now }
  })
  
export default mongoose.model('User', userSchema)
