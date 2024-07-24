const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");

router.get("/product", getProducts);
router.post("/product", addProducts);
router.patch("/product", updateProducts);
router.delete("/product", deleteProducts);

module.exports = router;
