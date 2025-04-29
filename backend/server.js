import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import session from 'express-session'
import passport from 'passport'
import mainInventoryRoutes from './routes/mainInventoryRoutes.js';
import authRoutes from './routes/authRoutes.js'
import './config/passportConfig.js' // path to your passport config file

import dbConnect from './config/dbConnect.js';
import morgan from 'morgan';


dotenv.config();
dbConnect();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(session({
  secret: process.env.YOUR_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())


// Auth Route
app.use('/api/auth', authRoutes)

// Routes of Website
app.use('/api/products', productRoutes);    // Product
app.use('/api/inventory', inventoryRoutes);  //Inventory
app.use('/api/mainInventory', mainInventoryRoutes); //Main Inventory



// Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
