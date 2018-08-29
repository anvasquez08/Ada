const { Inventory, ItemKeywords, Timestamp } = require("./schema.js");
const async = require('async');

exports.saveItem = ({name, brandName, url, imageUrl, price, labels, gender}, callback) => {
  new Inventory({name, brandName, url, imageUrl, price, labels, gender})
    .save()
    .then(response => callback(null,"Successfully saved data"))
    .catch(err => callback(err));
};

exports.inventoryItemsWithIds = (inventoryIds, callback) => {
  Inventory.find({_id: {$in: inventoryIds}}, (err, inventoryItems) => {
    if (err) {
      callback(err);
    } else {
      callback(null, inventoryItems);
    }
  })
}

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

exports.getKeywordEntries = (itemKeywords, callback) => {
  ItemKeywords.find({keyword: {$in: itemKeywords}}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log({results})
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
  Inventory.find({timestamp: {$gte: timestamp}}, (err, newItems) => {
    if (err) {
      callback(err);
    } else {
      callback(null, newItems);
    }
  })
}