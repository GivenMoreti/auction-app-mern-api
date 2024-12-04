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

router.get("/items", getAllItems);
router.get("/items/:id", getAnItem);
router.post("/items", createItem);
router.update("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);
