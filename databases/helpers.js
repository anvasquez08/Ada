const { Item, ItemKeywords, Timestamp } = require("./schema.js");

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
    .catch(err => console.log("Error in database save function"));
};

exports.indexItem = (id, itemLabels) => {

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

exports.getKetwordEntries = (itemKeywords, callback) => {
  Item.find({keyword: {$in: itemKeywords}}, (err, results) => {
    if (err) {
      callback(err);
    } else {
      console.log('RESULTS', results);
      callback(null, results);
    }
  })
}

exports.updateRecentTimestamp = (timestamp) => {
  Timestamp.findOneAndUpdate({}, {timestamp: timestamp}, (err) => {
    if (err) {
      console.log(err);
    }
  })
}

exports.getRecentTimestamp = (callback) => {
  Timestamp.findOne({}, (err, latestTimestamp) => {
    if (err) {
      callback(err);
    } else {
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