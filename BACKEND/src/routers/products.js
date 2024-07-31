const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/products");
const { authAdmin } = require("../middleware/auth");

const {
  validateAddProductData,
  validateUpdateProductData,
  validateDeleteProductData,
} = require("../validators/products");

const checkErrors = require("../validators/checkErrors");

router.get("/product", getProducts);
router.post(
  "/product",
  checkErrors,
  validateAddProductData,
  authAdmin,
  addProducts
);
router.patch(
  "/product",
  checkErrors,
  validateUpdateProductData,
  authAdmin,
  updateProducts
);
router.delete(
  "/product",
  checkErrors,
  validateDeleteProductData,
  authAdmin,
  deleteProducts
);

module.exports = router;
