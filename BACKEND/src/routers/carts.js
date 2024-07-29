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

router.post("/cart", auth, viewAllInCart);
router.put("/cart", auth, addToCart);
router.patch("/cart", auth, updateCart);
router.delete("/cart", auth, removeFromCart);
router.put("/checkout", auth, checkoutCartItems);

module.exports = router;
