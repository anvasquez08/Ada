const mongoose = require("mongoose");
const { inventoryDB } = require("./index.js");

const itemSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  brandName: String,
  url: { type: String, unique: true },
  imageUrl: String,
  price: Number,
  timestamp: { type: Date, default: Date.now }
});

const Item = inventoryDB.model("Item", itemSchema);

module.exports = { Item };