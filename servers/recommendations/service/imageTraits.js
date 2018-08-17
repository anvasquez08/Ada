const recommendationDB = require('./../../../databases/helpers.js');
const googleVision = require('../helpers/googleVision.js')
const DBHelpers = require('../../../databases/helpers');


let getRecommendationsForURL = (url, callback) => {
    console.log('url sent to get recommendations sercie'. url)
    googleVision.getLabelsFromURL(url, (err, labels) => {
        console.log('labels received in rec service', labels);
        if (err) {
            callback(err);
        } else {
            getRecommendationsFromLabels(labels, (err, recommendations) => {
                console.log('recs from labels in sevice', recommendations);
                if (err) {
                    callback(err);
                } else {
                    inventoryFromRecommendations(recommendations, (err, inventories) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null, inventories);
                        }
                    })
                }
            })
        }
    })
}

let inventoryFromRecommendations = (recommendations, callback) => {
    DBHelpers.inventoryItemsWithIds(recommendations, (err, inventories) => {
        if (err) {
            callback(err);
        } else {
            callback(null, inventories);
        }
    })
}

let getRecommendationsFromLabels = (labels, callback) => {
    recommendationDB.getKetwordEntries(labels, (err, inventoriesWithKeywords) => {
        if (err) {
            callback (err);
        } else {
            let keywordOccurences = numKeywordsForInventory(inventoriesWithKeywords);
            let recommendations = idsSortedByKeywordMatch(keywordOccurences);
            callback(null, recommendations);
        }
    })
}

let idsSortedByKeywordMatch = (occurenceObject) => {
    console.log(occurenceObject);
    let inventoryItems = Object.keys(occurenceObject);
    inventoryItems.sort((a, b) => {
        return occurenceObject[b] - occurenceObject[a];
    });
    return inventoryItems;
}

let numKeywordsForInventory = (inventoriesWithKeywords) => {
    let inventoryKeywordCount = {};
    inventoriesWithKeywords.forEach(keyword => {
        keyword.inventoryIds.forEach((inventoryId) => {
            if (inventoryKeywordCount[inventoryId]) {
                inventoryKeywordCount[inventoryId]++;
            } else {
                inventoryKeywordCount[inventoryId] = 1;
            }
        })
    });
    return inventoryKeywordCount;
}
module.exports = {
    getRecommendationsForURL
};