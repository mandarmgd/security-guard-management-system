const mongoose = require("mongoose");

const guardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueSentence: { type: String, required: true },
});

module.exports = mongoose.model("Guard", guardSchema);
