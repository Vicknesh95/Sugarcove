const { body } = require("express-validator");

const validateRegistrationData = [
  body("name", "name is required").notEmpty(),
  body("email", "email is required").notEmpty().isEmail(),
  body(
    "password",
    "password length must be a minimum of 8 and maximum of 20 characters"
  ).isLength({ min: 8, max: 20 }),
];

const validateLoginData = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

module.exports = {
  validateRegistrationData,
  validateLoginData,
};
