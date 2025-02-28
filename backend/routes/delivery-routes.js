const express = require("express");
const {
  createDelivery,
  deleteDelivery,
  getDelivery,
  getDeliverys,
  updateDelivery,
} = require("../controllers/deliveryController");

const router = express.Router();

router.get("/", getDeliverys);
router.get("/:id", getDelivery);
router.post("/", createDelivery);
router.put("/:id", updateDelivery);
router.delete("/:id", deleteDelivery);

module.exports = router;
