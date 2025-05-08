const Expense = require("../Model/Expense.json");

exports.getListofExpense = (req, res) => {
  res.status(200).json(Expense);
};

exports.register = (req, res) => {
  req.status
}