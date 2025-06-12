const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/auth");

const { 
  getAllProducts, 
  getFeaturedProducts, 
  getProductsByPrice, 
  getProductsByRating, 
  addProduct, 
  deleteProduct, 
  updateProduct,
  detailedProduct,
} = require("../Controllers/product");

// Get all products
router.get("/", getAllProducts);

// Get featured products
router.get("/featured", getFeaturedProducts);

// Get products by price
router.get("/price/:value", getProductsByPrice);

// Get products by rating
router.get("/rating/:value", getProductsByRating);

// Get detailed product
router.get("/:id", detailedProduct);

// Add a new product
router.post("/add",verifyToken, addProduct);

// Update a product
router.patch("/:id",verifyToken, updateProduct);

// Delete a product
router.delete("/:id",verifyToken, deleteProduct);

module.exports = router;
