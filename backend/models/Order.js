const mongoose = require("mongoose");
const Bid = require("./Bid");

const OrderSchema = new mongoose.Schema(
  {
    bid: [mongoose.SchemaTypes.ObjectId],
    ref: "Bid",
    required: true,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
