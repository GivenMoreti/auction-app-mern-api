const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Address", addressSchema);
