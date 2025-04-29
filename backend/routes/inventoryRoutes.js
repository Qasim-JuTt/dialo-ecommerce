import express from "express";
import multer from "multer";
import {
  createInventory,
  deleteInventory,
  getAllInventory,
  getSingleInventory,
  updateInventory,
} from "../controllers/inventoryController.js";

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/create", upload.array("images", 10), createInventory);
router.get("/allfetch/:mainCategory/:category", getAllInventory); // 👈 Fetch Route
router.put("/update/:id", upload.array("images"), updateInventory); // 👈 Update route
router.get("/fetchSingle/:id", getSingleInventory); // 👈 Fetch Route
router.get("/delete/:id", deleteInventory); // 👈 Fetch Route

export default router;
