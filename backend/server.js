const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploads folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});