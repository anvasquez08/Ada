const helpers = require('./../../../databases/helpers.js');
const googleVision = require('../helpers/googleVision.js');
const async = require('async');

let updateIndexDB = (callback) => {
    let now = Date.now();
    helpers.getRecentTimestamp((err, recentTimstamp) => {
        if (err) {
            callback(err);
        } else {
            if (!recentTimstamp) {
                console.log('no recent timestamp');
                recentTimstamp = {timestamp: '1995-12-17T03:24:00'}
            }
            helpers.retrieveNewItems(recentTimstamp.timestamp, (err, newInventory) => {
                if (err) {
                    console.log(err);
                } else {
                    indexNewItems(newInventory);
                    helpers.updateRecentTimestamp(now);
                }
            })
        }
    })
}

let indexAnalyzeInventoryItem = (inventoryID, imageURL, callback) => {
    googleVision.getLabelsFromURL(imageURL, function(err, descriptions) {
        if (err) {
            callback(err);
        } else {
            saveItemRecommendation (inventoryID, descriptions);
            callback(null);
        }
    })
}

let saveItemRecommendation = (inventoryId, itemLabels) => {
  helpers.indexItem(inventoryId, itemLabels);
}

let indexNewItems = (newItems) => {
    if (newItems) {
        async.each(newItems, (newItem) => {
            if (newItems) {
                indexAnalyzeInventoryItem(newItem._id, newItem.imageUrl, (err) => {
                    if(err) {
                        console.log(err);
                    }
                })
            }
        })
    }
}

module.exports = {
    updateIndexDB,
    indexAnalyzeInventoryItem
}