const mongoose = require("mongoose");
const Item = require("./Item");
const User = require("./User");

const AuctionSchema = new mongoose.Schema(
  {
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
      default: Date.now,
    },
    endDate: {
      required: true,
      type: Date,
      min: [Date.now, "End date cannot be in the past"],
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      default: "67512fcb4e0de861150850f3",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auction", AuctionSchema);
