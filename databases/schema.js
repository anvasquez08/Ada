const mongoose = require("mongoose");
const { inventoryDB } = require("./index.js");

/* Inventory Schema */
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

/* Keywords Schema */
var itemKeywords = mongoose.Schema({
  keyword: String,
  inventoryIds: [Number]
});

var ItemKeywords = mongoose.model('ItemKeywords', itemKeywords);

/* Timestamps Schema */
var mostRecentTimestamp = mongoose.Schema({
  timestamp: Date
});

var Timestamp = mongoose.model('Timestamp', mostRecentTimestamp);


module.exports = { Item, ItemKeywords, Timestamp };