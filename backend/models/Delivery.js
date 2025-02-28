const mongoose = require("mongoose");
const Addres = require("./Address");
const Order = require("./Order");

const DeliverySchema = new mongoose.Schema(
  {
    deliverTo: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Address",
      default: "",
    },
    costOfDelivery: {
      type: Number,
      required: true,
      min: 0,
    },
    order: {
      type: [mongoose.SchemaTypes.ObjectId],
      required: true,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", DeliverySchema);
