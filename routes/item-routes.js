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

router.get("/get", getAllItems);
router.get("/get/:id", getAnItem);
router.post("/add", createItem);
router.put("/update/:id", updateItem);
router.delete("/delete/:id", deleteItem);

module.exports = router;
