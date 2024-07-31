const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const { authAdmin } = require("../middleware/auth");

const {
  validateLoginData,
  validateRegistrationData,
} = require("../validators/auth");

const checkErrors = require("../validators/checkErrors");

router.get("/users", authAdmin, getAllUsers);
router.put("/register", checkErrors, validateRegistrationData, register);
router.post("/login", checkErrors, validateLoginData, login);
router.post("/refresh", refresh);

module.exports = router;
