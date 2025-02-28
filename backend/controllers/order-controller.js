const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body); // Renamed variable
    if (!newOrder) {
      return res.status(400).json({
        message: "Order not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Order created",
      success: true,
      data: newOrder, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error creating an Order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const order = await Order.find({}).populate("bid");

    if (!order?.length > 0) {
      res.status(404).json({
        message: "No Order found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Order",
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error retriving  Order" });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("bid");

    if (!order) {
      res.status(404).json({
        message: `Order with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "Order found",
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error retriving an Order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateOrder) {
      res.status(400).json({
        message: "failed to update an Order",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Order successfully",
      data: updateOrder,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error updating an Order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).json({
        message: `Order with id ${req.params.id} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error deleting an Order" });
  }
};

module.exports = {
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
};
