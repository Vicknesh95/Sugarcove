const { body } = require("express-validator");

const validateOrderStatusUpdate = [
  body("order_id", "order_id is required and must be a valid UUID").isUUID(),
  body(
    "status",
    "status is required and must be one of: 'PENDING PAYMENT', 'IN PROGRESS', 'COMPLETED'"
  )
    .notEmpty()
    .isIn(["PENDING PAYMENT", "IN PROGRESS", "COMPLETED"]),
];

module.exports = {
  validateOrderStatusUpdate,
};
