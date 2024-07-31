const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const {
  addToCart,
  updateCart,
  removeFromCart,
  viewAllInCart,
  checkoutCartItems,
} = require("../controllers/carts");

const {
  validateAddToCartData,
  validateUpdateCartData,
  validateRemoveFromCartData,
  validateCheckoutCartData,
} = require("../validators/carts");

const checkErrors = require("../validators/checkErrors");

router.post("/cart", auth, viewAllInCart);
router.put("/cart", checkErrors, validateAddToCartData, auth, addToCart);
router.patch("/cart", checkErrors, validateUpdateCartData, auth, updateCart);
router.delete(
  "/cart",
  checkErrors,
  validateRemoveFromCartData,
  auth,
  removeFromCart
);
router.put(
  "/checkout",
  checkErrors,
  validateCheckoutCartData,
  auth,
  checkoutCartItems
);

module.exports = router;
