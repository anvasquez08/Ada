const helpers = require('./../../../databases/helpers.js');
const googleVision = require('../helpers/googleVision.js');

let updateIndexDB = () => {
    let now = Date.now();
    helpers.getRecentTimestamp((err, recentTimstamp) => {
        if (err) {
            callback(err);
        } else {
            if (!recentTimstamp) {
                recentTimstamp = {timestamp: '1995-12-17T03:24:00'}
            }
            helpers.retrieveNewItems(recentTimstamp.timestamp, (err, newInventory) => {
                if (err) {
                    console.log(err);
                } else {
                    indexNewItems(newInventory);
                }
            })
        }
    })
}

let indexAnalyzeInventoryItem = (inventoryID, imageURL, callback) => {
    googleVision.getLabelsFromURL(imageURL, function(err, descriptions) {
        //console.log('DESCRIPTIONS', descriptions)
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
    console.log(newItems[0].imageUrl)
    if (newItems) {
        indexAnalyzeInventoryItem(newItems[0].id, 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png', (err) => {
            if(err) {
                console.log(err);
            } else {
                console.log('you did it');
            }
        })
    }
}

module.exports = {
    updateIndexDB,
    indexAnalyzeInventoryItem
}