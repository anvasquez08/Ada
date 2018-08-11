const mongoose = require("mongoose");

// Connection to inventory DB
const inventoryDB = mongoose.createConnection(
  "mongodb://fashionapp:hackreactor1@ds119081.mlab.com:19081/inventory", { poolSize: 20 }
);

inventoryDB.on('error', (err) => {
  if (err) throw err;
});

inventoryDB.once('open', () => {
  console.info('Connected to inventory database.');
});

module.exports = { inventoryDB };