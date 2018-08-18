const recommendationDB = require('./../../../databases/helpers.js');
const googleVision = require('../helpers/googleVision.js')
const DBHelpers = require('../../../databases/helpers');


let getRecommendationsForURL = (url, callback) => {
    console.log('get recommendations for URL START')
    googleVision.getLabelsFromURL(url, (err, labels) => {
        if (err) {
            callback(err);
        } else {
            getRecommendationsFromLabels(labels, (err, recommendations, occurenceObject) => {
                if (err) {
                    callback(err);
                } else {
                    inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
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
    console.log('get recommendations for URL STOP')
}

let inventoryFromRecommendations = (recommendations, occurenceObject, callback) => {
    DBHelpers.inventoryItemsWithIds(recommendations, (err, inventories) => {
        console.log('Inventories with IDs START')
        inventories = inventories.sort((a, b) => {
            return occurenceObject[b._id] - occurenceObject[a._id];
        })
        inventories = inventories.slice(0, 16);
        if (err) {
            callback(err);
        } else {
            callback(null, inventories);
        }
    })
    console.log('Inventories with IDs STOP')
}

let getRecommendationsFromLabels = (labels, callback) => {
    console.log('getRecommendationsFromLabels with IDs START')
    recommendationDB.getKetwordEntries(labels, (err, inventoriesWithKeywords) => {
        if (err) {
            callback (err);
        } else {
            let keywordOccurences = numKeywordsForInventory(inventoriesWithKeywords);
            let recommendations = idsSortedByKeywordMatch(keywordOccurences);
            callback(null, recommendations, keywordOccurences);
        }
    })
    console.log('getRecommendationsFromLabels with IDs START')
}

let idsSortedByKeywordMatch = (occurenceObject) => {
    let inventoryItems = Object.keys(occurenceObject);
    inventoryItems.sort((a, b) => {
        return occurenceObject[b] - occurenceObject[a];
    });
    return inventoryItems.slice(0, 16);
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