const express = require("express");
const {
  createAddress,
  deleteAddress,
  getAddress,
  getAddresss,
  updateAddress,
} = require("../controllers/address-controller");

const router = express.Router();

router.get("/", getAddresss);
router.get("/:id", getAddress);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
