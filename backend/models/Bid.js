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
      default: "67518bb78289a835637b9bb0",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", BidSchema);
