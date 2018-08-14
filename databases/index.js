const mongoose = require("mongoose");
const { DBInventoryURI } = require("../config.js");

const inventoryDB = mongoose.createConnection(DBInventoryURI, { poolSize: 20 });

inventoryDB.on("error", err => {
  if (err) throw err;
});

inventoryDB.once("open", () => {
  console.info("Connected to inventory database.");
});

module.exports = { inventoryDB };
