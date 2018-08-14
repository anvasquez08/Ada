const mongoose = require('mongoose');
const async = require('async');

mongoose.connect('mongodb://localhost/recommendations');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemKeywords = mongoose.Schema({
  keyword: String,
  inventoryIds: [Number]
});

var mostRecentTimestamp = mongoose.Schema({
  timestamp: Date
});

var Item = mongoose.model('ItemKeywords', itemKeywords);
var Timestamp = mongoose.model('Timestamp', mostRecentTimestamp);

let indexItem = (id, itemLabels) => {

  async.each(itemLabels, (label) => {
    Item.findOne({keyword: label}, (err, keywordItem) => {
      if (err) {
        console.log(err);
      } else {
        if (keywordItem === null) {
          let itemToSave = new Item({
            keyword: label,
            inventoryIds: [id]
          })
          itemToSave.save((err) => {
            if (err) {
              console.log(err);
            }
          })
        } else {
          Item.findOneAndUpdate({keyword: label}, {$push: {inventoryIds: id}}, (err) => {
            if (err) {
              console.log('ERR UPDATING KEYWORD')
            }
          })
        }
      }
    })
  }, (err) => {
    console.log(err);
  })
}

let getKetwordEntries = (itemKeywords, callback) => {
  Item.find({keyword: {$in: itemKeywords}}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log('RESULTS', results);
      callback(null, results);
    }
  })
}

let updateRecentTimestamp = (timestamp) => {
  Timestamp.findOneAndUpdate({}, {timestamp: timestamp}, (err) => {
    if (err) {
      console.log(err);
    }
  })
}

let getRecentTimestamp = (callback) => {
  Timestamp.findOne({}, (err, latestTimestamp) => {
    if (err) {
      callback(err);
    } else {
      callback(null, latestTimestamp);
    }
  })
}

module.exports = {
  db,
  indexItem,
  getKetwordEntries,
  updateRecentTimestamp,
  getRecentTimestamp
}