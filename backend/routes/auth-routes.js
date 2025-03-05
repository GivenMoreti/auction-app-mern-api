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
router.get("/users", getAllUsers);

// get user auctions & bids
// router.get("/users/:id/bids", getUserBids);
// router.get("/users/:id/auctions", getUserAuctions);


module.exports = router;
