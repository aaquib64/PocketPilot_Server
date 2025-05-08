const mongoose = require("mongoose");

const AddExpSchema = new mongoose.Schema({
  expense: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Expenses", AddExpSchema);   // AddExpenses
