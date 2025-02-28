const Bid = require("../models/Bid");

const createBid = async (req, res) => {
  try {
    const newBid = await Bid.create(req.body); // Renamed variable
    if (!newBid) {
      return res.status(400).json({
        message: "Bid not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Bid created",
      success: true,
      data: newBid, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error creating a Bid" });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({})
      .populate({
        path: "auction",
        populate: { path: "item" }, // Nested population
      })
      .populate("bidBy");
    
    
    if (!bids?.length > 0) {
      res.status(404).json({
        message: "No Bids found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Bids",
      success: true,
      data: bids,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error retriving  Bids" });
  }
};

const getBid = async (req, res) => {
  try {
    const Bid = await Bid.findById(req.params.id)
      .populate("auction")
      .populate("bidBy");

    if (!Bid) {
      res.status(404).json({
        message: `item with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "item found",
      success: true,
      data: Bid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error retriving an Bid" });
  }
};

const updateBid = async (req, res) => {
  try {
    const updateBid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateBid) {
      res.status(400).json({
        message: "failed to update an Bid",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Bid successfully",
      data: updateBid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error updating an Bid" });
  }
};

const deleteBid = async (req, res) => {
  try {
    const Bid = await Bid.findByIdAndDelete(req.params.id);
    if (!Bid) {
      res.status(404).json({
        message: `item with id ${itemId} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: Bid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error deleting an Bid" });
  }
};

module.exports = {
  getBid,
  getBids,
  updateBid,
  deleteBid,
  createBid,
};
