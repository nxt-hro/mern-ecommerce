const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name",
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (protected)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    // Validation
    if (!name || !description || !price || !category || !stock || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    const product = new Product({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      image: `/uploads/${req.file.filename}`,
      seller: req.user.userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
