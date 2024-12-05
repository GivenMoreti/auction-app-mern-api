const mongoose = require("mongoose");
const Item = require("./Item");

const AuctionSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  auctionPrice: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    min: [Date.now, "Start date cannot be in the past"],
  },
  endDate: {
    required: true,
    type: Date,
    min: [Date.now, "End date cannot be in the past"],
  },
  dateCreated: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model("Auction", AuctionSchema);
