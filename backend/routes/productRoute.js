// /routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getBrandProducts,
} = require("../controllers/productController");

// Route to get all products
router.get("/", getProducts);
router.get("/brand", getBrandProducts);
router.get("/:id", getSingleProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct); // Use :id parameter to specify the category to delete
router.put("/:id", updateProduct); // Use :id parameter to specify the category to delete

module.exports = router;
