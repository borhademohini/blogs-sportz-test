const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  mname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = { Employee };