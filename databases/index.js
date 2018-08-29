const mongoose = require("mongoose");
const async = require('async');
const { DBInventoryURI, DBImageURI, DBEditorialURI } = require("../config.js");


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

// const userDB = mongoose.createConnection
// UserDB is being initialized in databases/Users.js

/* ====  Editorial DB ==== */
const editorialDB = mongoose.createConnection(DBEditorialURI, { poolSize: 20 });

editorialDB.on("error", err => {
  if (err) throw err;
});

editorialDB.once("open", () => {
  console.info("Connected to image database.");
});

/* ====  Index DB ==== */
const indexDB = mongoose.createConnection(DBImageURI, { poolSize: 20 });

indexDB.on("error", err => {
  if (err) throw err;
});

indexDB.once("open", () => {
  console.info("Connected to image database.");
});


module.exports = { inventoryDB, imageDB, editorialDB, indexDB };