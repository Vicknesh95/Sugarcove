const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");
const { authAdmin } = require("../middleware/auth");

router.get("/users", authAdmin, getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
