const mongoose = require("mongoose");
const User = require("./User");
const Delivery = require("./Delivery");

const TransactionSchema = new mongoose.Schema(
  {
    //user
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    delivery: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Delivery",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
