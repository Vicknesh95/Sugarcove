const { body } = require("express-validator");

const validateAddToCartData = [
  body(
    "product_id",
    "product_id is required and must be a valid UUID"
  ).isUUID(),
  body("quantity", "quantity must be a positive integer").isInt({ min: 1 }),

  body(
    "notes",
    "notes must be a string with a maximum length of 200 characters"
  )
    .optional()
    .isLength({ max: 200 }),
];

const validateUpdateCartData = [
  body(
    "product_id",
    "product_id is required and must be a valid UUID"
  ).isUUID(),
  body("quantity", "quantity is required and must be a positive integer").isInt(
    { min: 1 }
  ),
  body(
    "notes",
    "notes must be a string with a maximum length of 200 characters"
  )
    .optional()
    .isLength({ max: 200 }),
];

const validateRemoveFromCartData = [
  body(
    "product_id",
    "product_id is required and must be a valid UUID"
  ).isUUID(),
];

const validateCheckoutCartData = [
  body("delivery_address", "delivery_address is required").notEmpty(),
  body(
    "contact_number",
    "contact_number is required and must be a valid integer"
  ).isInt(),
];

module.exports = {
  validateAddToCartData,
  validateUpdateCartData,
  validateRemoveFromCartData,
  validateCheckoutCartData,
};
