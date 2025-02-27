const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  logoutUser,
} = require("../controllers/user-controller");
const express = require("express");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/me", getUser);
router.post("/logout", logoutUser);
module.exports = router;
