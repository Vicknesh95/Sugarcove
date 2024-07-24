const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCart,
  removeFromCart,
  viewAllInCart,
  checkoutCartItems,
} = require("../controllers/carts");

router.get("/cart", viewAllInCart);
router.put("/cart", addToCart);
router.patch("/cart", updateCart);
router.delete("/cart", removeFromCart);
router.put("/checkout", checkoutCartItems);

module.exports = router;
