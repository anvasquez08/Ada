const mongoose = require("mongoose");
const { inventoryDB, imageDB} = require("./index.js");
const ObjectId = mongoose.Schema.ObjectId;

/* Inventory Schema */
const inventorySchema = mongoose.Schema({
  name: String,
  labels: [String],
  brandName: String,
  url: { type: String, unique: true },
  imageUrl: String,
  price: Number,
  gender: Number,
  timestamp: { type: Date, default: Date.now }
});

const Inventory = inventoryDB.model("Inventory", inventorySchema);

/* Keywords Schema */
var itemKeywords = mongoose.Schema({
  keyword: String,
  inventoryIds: [ObjectId]
});

var ItemKeywords = imageDB.model('ItemKeywords', itemKeywords);

/* Timestamps Schema */
var mostRecentTimestamp = mongoose.Schema({
  timestamp: Date
});

var Timestamp = imageDB.model('Timestamp', mostRecentTimestamp);


module.exports = { Inventory, ItemKeywords, Timestamp };