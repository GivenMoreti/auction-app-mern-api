const mongoose = require("mongoose");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema(
  {
    item: [mongoose.SchemaTypes.ObjectId],
    ref: "Item",
    required: true,
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
