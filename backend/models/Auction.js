const mongoose = require("mongoose");
const Item = require("./Item");
const User = require("./User");
const Bid = require("./Bid");

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
      default: Date.now,
    },
    endDate: {
      required: true,
      type: Date,
      min: [Date.now, "End date cannot be in the past"],
      validate: {
        validator: function (value) {
          return value > Date.now();
        },
        message: "End date cannot be in the past",
      },
    },
    postedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
      // default: "67512fcb4e0de861150850f3",
    },
  },
  { timestamps: true }
);

AuctionSchema.pre("remove", async function (next) {
  await Bid.deleteMany({ auction: this._id });
  next();
});

module.exports = mongoose.model("Auction", AuctionSchema);
