const { body } = require("express-validator");

const validateAddProductData = [
  body("product_name", "product_name is required").notEmpty(),
  body("product_type", "product_type is required").notEmpty(),
  body("product_price", "product_price must be a positive number and not empty")
    .notEmpty()
    .isFloat({
      min: 0,
    }),
  body("product_description", "product_description is required").notEmpty(),
  body("allergens", "allergens must be a string").optional().isString(),
  body("image_url", "image_url must be a string").optional().isString(),
];

const validateUpdateProductData = [
  body("product_name", "product_name is required").notEmpty(),
  body("product_type", "product_type is required").notEmpty(),
  body("product_price", "product_price must be a positive number").isFloat({
    min: 0,
  }),
  body("product_description", "product_description is required").notEmpty(),
  body("allergens", "allergens must be a string").optional().isString(),
  body("image_url", "image_url must be a string").optional().isString(),
  body("id", "id is required and must be a valid UUID").isUUID(),
];

const validateDeleteProductData = [
  body("id", "id is required and must be a valid UUID").isUUID(),
];

module.exports = {
  validateAddProductData,
  validateUpdateProductData,
  validateDeleteProductData,
};
