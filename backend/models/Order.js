const mongoose = require("mongoose");
const Bid = require("./Bid");

const OrderSchema = new mongoose.Schema(
  {
    bid: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "Bid",
      required: true,
    },
    serviceFee: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
