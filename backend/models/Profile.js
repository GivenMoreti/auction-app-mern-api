const mongoose = require("mongoose");
const User = require("./User");
const Auction = require("./Auction");
const Bid = require("./Bid");

const UserProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    auctions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Auction",
    },
    bids: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Bid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", UserProfileSchema);
