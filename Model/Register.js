const mongoose = require ("mongoose");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("User", RegisterSchema); // DB table name and Schema name  Registers
