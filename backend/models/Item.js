const mongoose = require("mongoose");
const Auction = require("./Auction");

const ItemSchema = new mongoose.Schema(
  {
    imgUrl: {
      type: [String],
      required: true,
      default:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    title: {
      required: [true, "Item title is required"],
      type: String,
      trim: true,
      maxLength: [100, "item title cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      required: [true, "Item description is required"],
      type: String,
      trim: true,
      maxLength: [100, "item description cannot be more than 100 characters"],
    },
    tags: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
ItemSchema.pre("remove", async function (next) {
  const auctions = await Auction.find({ item: this._id });

  // Delete all related bids first
  for (let auction of auctions) {
    await Bid.deleteMany({ auction: auction._id });
  }

  // Delete all related auctions
  await Auction.deleteMany({ item: this._id });

  next();
});
module.exports = mongoose.model("Item", ItemSchema);
