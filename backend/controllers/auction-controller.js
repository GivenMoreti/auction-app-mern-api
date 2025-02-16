const Auction = require("../models/Auction");

const createAuction = async (req, res) => {
  const { item, auctionPrice } = req.body;
  try {
    const existingAuction = await Auction.findOne({
      item: item,
      auctionPrice: auctionPrice,
    });

    if (existingAuction) {
      return res.status(400).json({
        message: "Auction with item and price already exists",
        success: false,
      });
    }

    const newAuction = await Auction.create(req.body); // Renamed variable
    if (!newAuction) {
      return res.status(400).json({
        message: "Auction not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Auction created",
      success: true,
      data: newAuction, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error creating an auction" });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({}).populate("item");
    if (!auctions?.length > 0) {
      res.status(404).json({
        message: "No Auctions found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Auctions",
      success: true,
      data: auctions,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error retriving  auctions" });
  }
};

const getAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate("item");

    if (!auction) {
      res.status(404).json({
        message: `item with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "item found",
      success: true,
      data: auction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error retriving an auction" });
  }
};

const updateAuction = async (req, res) => {
  try {
    const updateAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateAuction) {
      res.status(400).json({
        message: "failed to update an auction",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated auction successfully",
      data: updateAuction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error updating an auction" });
  }
};

const deleteAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      res.status(404).json({
        message: `item with id ${itemId} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: auction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error deleting an auction" });
  }
};

module.exports = {
  getAuction,
  getAuctions,
  updateAuction,
  deleteAuction,
  createAuction,
};
