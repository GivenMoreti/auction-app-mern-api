const mongoose = require("mongoose");
const Profile = require("./Profile"); // Import the Profile model
const Address = require("./Address");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Address",
    },
  },
  { timestamps: true }
);

// Middleware to create a user profile after user is created
UserSchema.post("save", async function (doc, next) {
  try {
    // Create a new profile and link it to the user
    await Profile.create({
      user: doc._id,
      auctions: [],
      bids: [],
    });

    console.log(`Profile created for user: ${doc._id}`);
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
