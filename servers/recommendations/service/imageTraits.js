const recommendationDB = require('./../../../databases/helpers.js');
const detectLabels = require('../helpers/detectLabels.js')

//Takes URL of image and returns array of inventoryId's to callback 
let getRecommendationsForURL = (url, callback) => {
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
}

let inventoryFromRecommendations = (recommendations, occurenceObject, callback) => {
    DBHelpers.inventoryItemsWithIds(recommendations, (err, inventories) => {
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
}

let getRecommendationsFromLabels = (labels, callback) => {
    recommendationDB.getKetwordEntries(labels, (err, inventoriesWithKeywords) => {
        if (err) {
            callback (err);
        } else {
            let keywordOccurences = numKeywordsForInventory(inventoriesWithKeywords);
            let recommendations = idsSortedByKeywordMatch(keywordOccurences);
            callback(null, recommendations, keywordOccurences);
        }
    })
}

//Takes an object of inventoryIds and their occurences, returns array of inventoryIds sorted by greatest occurences first
let idsSortedByKeywordMatch = (occurenceObject) => {
    let inventoryItems = Object.keys(occurenceObject);
    inventoryItems.sort((a, b) => {
        return occurenceObject[b] - occurenceObject[a];
    });
    return inventoryItems;
}

//Checks the recommendations DB for tags in keywords, returns object containing the inventory ID's found with their occurences
let numKeywordsForInventory = (keywords) => {
    let inventoryKeywordCount = {};
    keywords.forEach(keyword => {
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