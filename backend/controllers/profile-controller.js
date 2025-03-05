const Profile = require("../models/Profile");

const createProfile = async (req, res) => {
  try {
    const newProfile = await Profile.create(req.body); // Renamed variable
    if (!newProfile) {
      return res.status(400).json({
        message: "Profile not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Profile created",
      success: true,
      data: newProfile, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error creating an Profile" });
  }
};

const getProfiles = async (req, res) => {
  try {
    const profile = await Profile.find({})
      .populate("user")
      .populate("bids")
      .populate("auctions");

    if (!profile?.length > 0) {
      res.status(404).json({
        message: "No Profile found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Profile",
      success: true,
      data: profile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error retriving  Profile" });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available from authentication

    // Find profile by user ID and populate bids and auctions
    const profile = await Profile.findOne({ user: userId })
      .populate("auctions") // Populate auctions
      .populate("bids"); // Populate bids

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




const updateProfile = async (req, res) => {
  try {
    const updateProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateProfile) {
      res.status(400).json({
        message: "failed to update an Profile",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Profile successfully",
      data: updateProfile,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error updating an Profile" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      res.status(404).json({
        message: `Profile with id ${req.params.id} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: Profile,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error deleting an Profile" });
  }
};

module.exports = {
  getProfile,
  getProfiles,
  updateProfile,
  deleteProfile,
  createProfile,
};
