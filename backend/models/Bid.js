const mongoose = require("mongoose");
const Auction = require("./Auction");

const BidSchema = new mongoose.Schema(
  {
    auction: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Auction",
    },
    bidPrice: {
      type: Number,
      required: true,
    },
    bidBy: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", BidSchema);
