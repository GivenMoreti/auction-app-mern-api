const Item = require("../models/Item");
const mongoose = require("mongoose");

const createItem = async (req, res) => {
  try {
    //CREATING A NEW ITEM
    // const existingItem = await Item.findOne({$and:[""]});

    const newlyCreatedItem = await Item.create(req.body);

    if (!newlyCreatedItem) {
      res.status(400).json({
        success: false,
        message: "Item not created",
      });
    }

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: newlyCreatedItem,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error creating an item" });
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error creating an item" });
  }
};

const getAnItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

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
    // Validate the id format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid item ID format",
        success: false,
      });
    }

    // Attempt to find and update the item
    const itemToUpdate = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });

    if (!itemToUpdate) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item updated successfully",
      success: true,
      data: itemToUpdate,
    });
  } catch (error) {
    console.log(error); // Log the full error for debugging
    return res.status(500).json({
      message: "Server error while updating item",
      success: false,
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
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
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error deleting an item" });
  }
};

module.exports = {
  getAllItems,
  getAnItem,
  deleteItem,
  updateItem,
  createItem,
};
