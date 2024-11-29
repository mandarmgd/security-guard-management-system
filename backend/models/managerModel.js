const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ManagerSchema = new mongoose.Schema(
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
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    uniqueSentence: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Manager", ManagerSchema);
