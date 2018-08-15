const mongoose = require("mongoose");
const async = require('async');
const { DBInventoryURI, DBImageURI } = require("../config.js");


/* ====  Inventory DB ==== */
const inventoryDB = mongoose.createConnection(DBInventoryURI, { poolSize: 20 });

inventoryDB.on("error", err => {
  if (err) throw err;
});

inventoryDB.once("open", () => {
  console.info("Connected to inventory database.");
});


/* ====  Image DB ==== */
const imageDB = mongoose.createConnection(DBImageURI, { poolSize: 20 });

imageDB.on("error", err => {
  if (err) throw err;
});

imageDB.once("open", () => {
  console.info("Connected to image database.");
});

module.exports = { inventoryDB, imageDB };
