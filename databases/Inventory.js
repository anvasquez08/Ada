var mongoose = require('mongoose');
var mongoUri = 'mongodb://localhost/inventory';

var inventory = require('../databases/testData/asos.json')

// Connect Mongoose to our local MongoDB via URI specified above and export it below
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongoDB - inventory database");
});

let itemSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  brandName: String,
  imageUrl: String,
  url: String,
  price: Number
});

let Item = mongoose.model('Item', itemSchema);

let saveItem = (id, name, brandName, imageUrl, url, price) => {
  let newItem = new Item({
    id: id,
    name: name,
    brandName: brandName,
    imageUrl: imageUrl,
    url: url,
    price: price
  });

  newItem.save((err) => {
    if (err) console.log('Error in database save function');
    else console.log('Successfully saved data');
  });
}

module.exports = {
  db,
  saveItem
}