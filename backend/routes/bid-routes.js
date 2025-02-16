const express = require("express");
const {
  createBid,
  deleteBid,
  getBid,
  getBids,
  updateBid,
} = require("../controllers/bid-controller");

const router = express.Router();

router.get("/", getBids);
router.get("/:id", getBid);
router.post("/", createBid);
router.put("/:id", updateBid);
router.delete("/:id", deleteBid);

module.exports = router;
