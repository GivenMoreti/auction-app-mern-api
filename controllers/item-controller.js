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
        data: newlyCreatedItem,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAllItems = async (req, res) => {
  try {
    //RETRIEVING ALL THE ITEMS
    const allItems = await Item.find({});

    if (allItems?.length > 0) {
      res.status(200).json({
        success: true,
        message: "List of all items",
        data: allItems,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAnItem = async (req, res) => {
  try {
    //get a single item by id
    const itemid = req.params.id;
    const item = await Item.findById(itemid);

    if (item) {
      res.status(200).json({
        success: true,
        message: "An item",
        data: item,
      });
    } else {
      res.status(404).json({
        message: `item with id ${itemid} cannot be found`,
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItemFormData = req.body;

    const itemToUpdate = await Item.findByIdAndUpdate(
      itemId,
      updatedItemFormData,
      {
        new: true,
      }
    );

    if (!itemToUpdate) {
      res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "updated item",
      success: true,
      data: itemToUpdate,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findByIdAndDelete(itemId);
    if (item) {
      res.status(200).json({
        success: true,
        message: `deleted item with id ${itemId}`,
        data: item,
      });
    } else {
      res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllItems,
  getAnItem,
  deleteItem,
  updateItem,
  createItem,
};
