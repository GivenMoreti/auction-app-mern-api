const mongoose = require("mongoose");
const User = require("./User");
const Auction = require("./Auction");
const Address = require("./Address");

const UserProfile = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      default: "",
    },
    auctions: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Auction",
      required: true,
    },
    bids: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Bid",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", UserProfile);
