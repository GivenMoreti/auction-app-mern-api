const express = require("express");
const {
  createAuction,
  deleteAuction,
  getAuction,
  getAuctions,
  updateAuction,
} = require("../controllers/auction-controller");

const router = express.Router();

router.get("/get", getAuctions);
router.get("/get/:id", getAuction);
router.post("/add", createAuction);
router.put("/update/:id", updateAuction);
router.delete("/delete/:id", deleteAuction);

module.exports = router;
