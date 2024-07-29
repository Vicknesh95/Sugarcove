const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");
const { authAdmin } = require("../middleware/auth");

router.get("/product", getProducts);
router.post("/product", authAdmin, addProducts);
router.patch("/product", authAdmin, updateProducts);
router.delete("/product", authAdmin, deleteProducts);

module.exports = router;
