const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const routes = require('./Routes/index');
const cors = require("cors");
const Registers = require("./Model/Register");
const AddExpenses = require("./Model/AddExp");

const app = express();
const PORT = 5500;

app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:3000`, `https://pocketpilot-app.netlify.app`],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization");
  next();
});

{
  /*mongoose
  .connect("mongodb://127.0.0.1:27017/Expense") */
}

const uri = process.env.MONGODB_URI;

console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  Registers.findOne({ username: username }) // If email is exixiting then check password
    .then((user) => {
      if (user) {
        if (user.password === password) {
          // If pass is correct
          res.json("Success");
        } else {
          res.json("the password is incorrect");
        }
      } else {
        res.json("No record exixted");
      }
    });
});

app.post("/Register", (req, res) => {
  Registers.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.post("/Add_Expenses", (req, res) => {
  AddExpenses.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/addexpenses", (req, res) => {
  AddExpenses.find()
    .then((expenses) => res.json(expenses))
    .catch((err) => {
      console.error("❌ Error fetching expenses:", err);
      res.status(500).json({ error: err.message });
    });
});

// app.put("/Update/:_id", (req, res) => {
//   AddExpenses.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(data => res.json(data))
//     .catch(err => res.json(err));
// });

app.put("/Update/:_id", (req, res) => {
  AddExpenses.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.delete("/Delete/:_id", (req, res) => {
  AddExpenses.findByIdAndDelete(req.params._id)
    .then(() => res.json({ message: "Expense Deleted Successfully" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// app.use('/', routes);//

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
