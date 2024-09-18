const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  tags: [String],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
