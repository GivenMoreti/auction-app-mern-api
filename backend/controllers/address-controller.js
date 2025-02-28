const Address = require("../models/Address");

const createAddress = async (req, res) => {
  try {
    const newAddress = await Address.create(req.body); // Renamed variable
    if (!newAddress) {
      return res.status(400).json({
        message: "Address not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Address created",
      success: true,
      data: newAddress, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error creating an Address" });
  }
};

const getAddresss = async (req, res) => {
  try {
    const address = await Address.find({});
    if (!address?.length > 0) {
      res.status(404).json({
        message: "No Address found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Address",
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error retriving  Address" });
  }
};

const getAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      res.status(404).json({
        message: `Address with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "address found",
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error retriving an Address" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const updateAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateAddress) {
      res.status(400).json({
        message: "failed to update an Address",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Address successfully",
      data: updateAddress,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error updating an Address" });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      res.status(404).json({
        message: `address with id ${req.params.id} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error deleting an Address" });
  }
};

module.exports = {
  getAddress,
  getAddresss,
  updateAddress,
  deleteAddress,
  createAddress,
};
