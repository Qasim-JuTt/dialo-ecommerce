// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById
} from "../controllers/productController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Setup for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/create", upload.array("images", 5), createProduct); // Existing route to create a product
router.get("/getAllProducts", getAllProducts); // New route to fetch all products
router.get("/getProduct/:id", getProductById); // New route to fetch Single Record
router.put("/productUpdate/:id", upload.array("images", 5), updateProductById); // New route to update Single Record
router.delete("/deleteProduct/:id", deleteProductById);


export default router;
