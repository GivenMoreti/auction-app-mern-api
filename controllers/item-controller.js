const Item = require("../models/Item");

const createItem = async (req, res) => {
  try {
    //CREATING A NEW ITEM
    const newItem = req.body;
    const newlyCreatedItem = await Item.create(newItem);
    
    
    if (newlyCreatedItem) {
      res.status(201).json({
        success: true,
        message: "Item created successfully",
      });
    }

    
  } catch (err) {
    console.log(err);
  }
};

const getAllItems = async (req, res) => {};

const getAnItem = async (req, res) => {};

const updateItem = async (req, res) => {};

const deleteItem = async (req, res) => {};

module.exports = {
  getAllItems,
  getAnItem,
  deleteItem,
  updateItem,
  createItem,
};
