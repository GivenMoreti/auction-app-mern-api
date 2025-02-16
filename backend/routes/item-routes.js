const express = require("express");
const {
  getAllItems,
  deleteItem,
  getAnItem,
  updateItem,
  createItem,
} = require("../controllers/item-controller");

const router = express.Router();

//get all the items

router.get("/", getAllItems);
router.get("/:id", getAnItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
