const express = require("express");
const router = express.Router();
const { getProducts, addProducts } = require("../controllers/products");

router.get("/product", getProducts);
router.post("/product", addProducts);
module.exports = router;
