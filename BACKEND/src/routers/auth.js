const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
} = require("../controllers/auth");

router.get("/users", getAllUsers);
router.put("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
