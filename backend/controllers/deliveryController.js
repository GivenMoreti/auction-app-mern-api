const Delivery = require("../models/Delivery");

const createDelivery = async (req, res) => {
  try {
    const newDelivery = await Delivery.create(req.body); // Renamed variable
    if (!newDelivery) {
      return res.status(400).json({
        message: "Delivery not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Delivery created",
      success: true,
      data: newDelivery, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error creating an Delivery" });
  }
};

const getDeliverys = async (req, res) => {
  try {
    const delivery = await Delivery.find({});
    if (!delivery?.length > 0) {
      res.status(404).json({
        message: "No Delivery found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Delivery",
      success: true,
      data: delivery,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error retriving  Delivery" });
  }
};

const getDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findById(req.params.id)
      .populate("address")
      .populate("order");

    if (!delivery) {
      res.status(404).json({
        message: `Delivery with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "Delivery found",
      success: true,
      data: delivery,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error retriving an Delivery" });
  }
};

const updateDelivery = async (req, res) => {
  try {
    const updateDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateDelivery) {
      res.status(400).json({
        message: "failed to update an Delivery",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Delivery successfully",
      data: updateDelivery,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error updating an Delivery" });
  }
};

const deleteDelivery = async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!delivery) {
      res.status(404).json({
        message: `Delivery with id ${req.params.id} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: delivery,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error deleting an Delivery" });
  }
};

module.exports = {
  getDelivery,
  getDeliverys,
  updateDelivery,
  deleteDelivery,
  createDelivery,
};
