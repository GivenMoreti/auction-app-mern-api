const express = require("express");
const {
  createAuction,
  deleteAuction,
  getAuction,
  getAuctions,
  updateAuction,
} = require("../controllers/auction-controller");

const router = express.Router();

router.get("/", getAuctions);
router.get("/:id", getAuction);
router.post("/", createAuction);
router.put("/:id", updateAuction);
router.delete("/:id", deleteAuction);

module.exports = router;
