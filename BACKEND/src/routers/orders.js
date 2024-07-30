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

router.post("/pending", auth, getPendingOrders);
router.post("/inProgress", auth, getInProgressOrders);
router.post("/completed", auth, getCompletedOrders);
router.patch("/update", authAdmin, updateOrderStatus);
router.get("/admin/orders", getAdminOrders);

module.exports = router;
