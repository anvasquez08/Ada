const mongoose = require('mongoose');
const { inventoryDB } = require('./index.js');

const inventorySchema = new mongoose.Schema({
    url: { type: String, unique: true },
    brandName: String,
    price: Number, 
    imageUrl: String,
    visualTags: [String],
    timestamp: { type : Date, default: Date.now }
});
  
const Inventory = inventoryDB.model('Inventory', inventorySchema);

 module.exports = { Inventory }