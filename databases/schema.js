const mongoose = require("mongoose");
const { inventoryDB, imageDB} = require("./index.js");

/* Inventory Schema */
const itemSchema = mongoose.Schema({
  // id: { type: Number, unique: false},
  name: String,
  labels: [String],
  brandName: String,
  url: { type: String, unique: true, sparse: true },
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

var ItemKeywords = imageDB.model('ItemKeywords', itemKeywords);

/* Timestamps Schema */
var mostRecentTimestamp = mongoose.Schema({
  timestamp: Date
});

var Timestamp = imageDB.model('Timestamp', mostRecentTimestamp);


module.exports = { Item, ItemKeywords, Timestamp };