const helpers = require('./../../../databases/helpers.js');
const detectLabels = require('../helpers/detectLabels.js');
const async = require('async');

//Recommendation worker checks the inventory DB for new additions and adds them to the recommendation DB

let updateIndexDB = (callback) => {
    let now = Date.now();

    //Get the last time the recommendation worker ran
    helpers.getRecentTimestamp((err, recentTimstamp) => {
        if (err) {
            callback(err);
        } else {
            if (!recentTimstamp) {
                recentTimstamp = {timestamp: '1995-12-17T03:24:00'}
            }
            //retrieve all items in the inventory DB added after most recent timestamp
            helpers.retrieveNewItems(recentTimstamp.timestamp, (err, newInventory) => {
                console.log(newInventory);
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

//Check tags of image and add inventory ID to each of those tags in recommendation DB
let indexAnalyzeInventoryItem = (inventoryID, imageURL, callback) => {
    detectLabels.getLabelsFromURL(imageURL, function(err, descriptions) {
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

//Takes an array of Items, gets their tags and adds them to the recommendation DB
let indexNewItems = (newItems) => {
    if (newItems) {
        async.each(newItems, (newItem) => {
            if (newItems) {
                indexAnalyzeInventoryItem(newItem.id, newItem.imageUrl, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('you did it');
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