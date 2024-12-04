const Auction = require("../models/Auction");

const createAuction = async (req, res) => {
  try {
    const itemDetails = req.body;
    const item = await Auction.create(itemDetails);
    if (item) {
      res.status(201).json({
        message: "Auction created ",
        success: true,
        data: item,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({});
    if (auctions?.length > 0) {
      res.status(200).json({
        message: "All Auctions",
        success: true,
        data: auctions,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getAuction = async (req, res) => {
  try {
    //get auction by id
    const itemId = req.params.id;
    const auction = await Auction.findById(itemId);
    if (!auction) {
      res.status(404).json({
        message: "item with id ${itemId} does not exist",
        success: false,
      });
    }

    res.status(200).json({
      message: "item found",
      success: true,
      data: auction,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateAuction = async (req, res) => {
  try {
    const auctionFormData = req.body;
    const itemId = req.params.id;
    const updateAuction = await Auction.findByIdAndUpdate(
      itemId,
      auctionFormData,
      {
        new: true,
      }
    );

    if (!updateAuction) {
      res.status(500).json({
        message: "Something went wrong",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated auction successfully",
      data: updateAuction,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteAuction = async (req, res) => {
  try {
    const itemId = req.params.id;
    const auction = await Auction.findByIdAndDelete(itemId);
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
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAuction,
  getAuctions,
  updateAuction,
  deleteAuction,
  createAuction,
};
