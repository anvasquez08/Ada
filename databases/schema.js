const mongoose = require("mongoose");
const { inventoryDB, imageDB, editorialDB } = require("./index.js");
const ObjectId = mongoose.Schema.ObjectId;

/* Inventory Schema */
const inventorySchema = mongoose.Schema({
  name: String,
  labels: [String],
  brandName: String,
  url: { type: String, unique: true },
  imageUrl: { type: String, unique: true },
  gender: Number,
  price: Number,
  gender: Number,
  timestamp: { type: Date, default: Date.now }
});

const Inventory = inventoryDB.model("Inventory", inventorySchema);

/* Keywords Schema */
var itemKeywords = mongoose.Schema({
  keyword: { type: String, unique: true },
  inventoryIds: [ObjectId]
});

var ItemKeywords = imageDB.model('ItemKeywords', itemKeywords);

/* Timestamps Schema */
var mostRecentTimestamp = mongoose.Schema({
  timestamp: Date
});

var Timestamp = imageDB.model('Timestamp', mostRecentTimestamp);

/* Editorial Schema */
const editorialSchema = mongoose.Schema({
  publicationName: {type: String, unique: false},
  title: {type: String, unique: false},
  paragraph: {type: String, unique: false},
  images: [{
    source: {type: String, unique: false},
    numOfImages: {type: String, unique: false},
    image: {type: String, unique: false},
  }],
  timestamp: { type: Date, default: Date.now, unique: false }
});

const Editorial = editorialDB.model("Editorial", editorialSchema);


module.exports = { Inventory, ItemKeywords, Timestamp, Editorial };
