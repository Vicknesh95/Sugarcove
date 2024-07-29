const express = require("express");
const router = express.Router();
const {
  getPendingOrders,
  getInProgressOrders,
  getCompletedOrders,
  updateOrderStatus,
} = require("../controllers/orders");

router.post("/pending", getPendingOrders);
router.post("/inProgress", getInProgressOrders);
router.post("/completed", getCompletedOrders);
router.patch("/updatestatus", updateOrderStatus);

module.exports = router;
