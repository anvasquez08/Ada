const { Item, ItemKeywords, Timestamp } = require("./schema.js");
const async = require('async');

exports.saveItem = (id, name, brandName, url, imageUrl, price) => {
  new Item({
    id: id,
    name: name,
    brandName: brandName,
    url: url,
    imageUrl: imageUrl,
    price: price
  })
    .save()
    .then(response => console.log("Successfully saved data"))
    .catch(err => console.log("Error in database save function", err));
};

exports.indexItem = (id, itemLabels) => {

  async.each(itemLabels, (label) => {
    ItemKeywords.findOne({keyword: label}, (err, keywordItem) => {
      if (err) {
        console.log(err);
      } else {
        if (keywordItem === null) {
          let itemToSave = new ItemKeywords({
            keyword: label,
            inventoryIds: [id]
          })
          itemToSave.save((err) => {
            if (err) {
              console.log(err);
            }
          })
        } else {
          ItemKeywords.findOneAndUpdate({keyword: label}, {$push: {inventoryIds: id}}, (err) => {
            if (err) {
              console.log('ERR UPDATING KEYWORD', err)
            }
          })
        }
      }
    })
  }, (err) => {
    console.log(err);
  })
}

exports.getKetwordEntries = (itemKeywords, callback) => {
  ItemKeywords.find({keyword: {$in: itemKeywords}}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log('RESULTS', results);
      callback(null, results);
    }
  })
}

exports.updateRecentTimestamp = (timestamp) => {
  Timestamp.findOne({}, (err, oldTimestamp) => {
    if (err) {
      console.log(err);
    } else {
      if (oldTimestamp === null) {
        let timestampToSave = new Timestamp({
          timestamp: timestamp
        });
        timestampToSave.save((err) => {
          if (err) {
            console.log(err);
          }
        })
      } else {
        Timestamp.findOneAndUpdate({}, {timestamp: timestamp}, (err) => {
          if (err) {
            console.log(err);
          }
        })
      }
    }
  })
}

exports.getRecentTimestamp = (callback) => {
  console.log('hit timestamp');
  Timestamp.findOne({}, (err, latestTimestamp) => {
    if (err) {
      console.log('error getting recent timestamp', err);
      callback(err);
    } else {
      console.log('latest timestamp', latestTimestamp)
      callback(null, latestTimestamp);
    }
  })
}


exports.retrieveNewItems = (timestamp, callback) => {
    Item.find({timestamp: {$gte: timestamp}}, (err, newItems) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newItems);
      }
    })
  }