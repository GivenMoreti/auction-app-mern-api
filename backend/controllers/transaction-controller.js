const Transaction = require("../models/Transaction");

const createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body); // Renamed variable
    if (!newTransaction) {
      return res.status(400).json({
        message: "Transaction not created",
        success: false,
      });
    }

    res.status(201).json({
      message: "Transaction created",
      success: true,
      data: newTransaction, // Use the renamed variable
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error creating an Transaction" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transaction = await Transaction.find({})
      .populate("user")
      .populate("delivery");

    if (!transaction?.length > 0) {
      res.status(404).json({
        message: "No Transaction found",
        success: false,
        data: [],
      });
    }

    res.status(200).json({
      message: "All Transaction",
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error retriving  Transaction" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate("user")
      .populate("delivery");

    if (!transaction) {
      res.status(404).json({
        message: `Transaction with id ${req.params.id} does not exist`,
        success: false,
      });
    }

    res.status(200).json({
      message: "Transaction found",
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error retriving an Transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const updateTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateTransaction) {
      res.status(400).json({
        message: "failed to update an Transaction",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated Transaction successfully",
      data: updateTransaction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error updating an Transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      res.status(404).json({
        message: `Transaction with id ${req.params.id} does not exist`,
        success: false,
      });
    }
    res.status(200).json({
      message: "Deleted successfully",
      success: true,
      data: Transaction,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error deleting an Transaction" });
  }
};

module.exports = {
  getTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  createTransaction,
};
