const express = require("express");
const {
  createBid,
  deleteBid,
  getBid,
  getBids,
  updateBid,
} = require("../controllers/bid-controller");
const verifyToken = require("../middlewares/routesProtector");

const router = express.Router();

router.get("/", verifyToken, getBids);
router.get("/:id", getBid);
router.post("/", createBid);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);

module.exports = router;
