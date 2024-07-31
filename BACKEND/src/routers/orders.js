const express = require("express");
const router = express.Router();
const {
  getPendingOrders,
  getInProgressOrders,
  getCompletedOrders,
  updateOrderStatus,
  getAdminOrders,
} = require("../controllers/orders");
const { auth, authAdmin } = require("../middleware/auth");

const { validateOrderStatusUpdate } = require("../validators/orders");
const checkErrors = require("../validators/checkErrors");

router.post("/pending", auth, getPendingOrders);
router.post("/inProgress", auth, getInProgressOrders);
router.post("/completed", auth, getCompletedOrders);
router.patch(
  "/update",
  checkErrors,
  validateOrderStatusUpdate,
  authAdmin,
  updateOrderStatus
);
router.get("/Admin", authAdmin, getAdminOrders);

module.exports = router;
