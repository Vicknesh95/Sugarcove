const express = require("express");
const router = express.Router();
const {
  getPendingOrders,
  getInProgressOrders,
  getCompletedOrders,
  updateOrderStatus,
} = require("../controllers/orders");

router.get("/pending", getPendingOrders);
router.get("/inProgress", getInProgressOrders);
router.get("/completed", getCompletedOrders);
router.patch("/updatestatus", updateOrderStatus);

module.exports = router;
