const recommendationDB = require('./../../../databases/index.js');
const googleVision = require('../helpers/googleVision.js')


let getRecommendationsForURL = (url, callback) => {
    googleVision.getLabelsFromURL(url, (err, labels) => {
        if (err) {
            callback(err);
        } else {
            getRecommendationsFromLabels(labels, (err, recommendations) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, recommendations)
                }
            })
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
    let inventoryItems = Object.keys(occurenceObject);
    console.log(occurenceObject);
    inventoryItems.sort((a, b) => {
        return occurenceObject[a] - occurenceObject[b];
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