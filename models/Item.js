const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
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
  isAvailable: {
    type: Boolean,
    default: true,
  },
  tags: [],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
