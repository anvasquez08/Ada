const recommendationDB = require('./../../../databases/helpers.js');
<<<<<<< HEAD
const googleVision = require('../helpers/googleVision.js')
||||||| merged common ancestors
const googleVision = require('../helpers/googleVision.js')
const DBHelpers = require('../../../databases/helpers');
=======
const detectLabels = require('../helpers/detectLabels.js')
>>>>>>> origin/jack

let getRecommendationsForImage64 = (image64, callback) => {
    detectLabels.getLabelsFromImage64(image64, (err, labels) => {
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

let getRecommendationsForImageUrl = (image64, callback) => {
    detectLabels.getLabelsFromUrl(image64, (err, labels) => {
        if (err) {
            callback(err);
        } else {
        //   console.log('THESE ARE THE LABELS: ', labels)
            getRecommendationsFromLabels(labels, (err, recommendations, occurenceObject) => {
                if (err) {
                    callback(err);
                } else {
<<<<<<< HEAD
                    callback(null, recommendations)
||||||| merged common ancestors
                    inventoryFromRecommendations(recommendations, (err, inventories) => {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null, inventories);
                        }
                    })
=======
                //   console.log('THESE ARE THE RECOMMENDATIONS', recommendations)
                    inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
                        if (err) {
                            callback(err)
                        } else {
                        //   console.log('in image trait', inventories)
                            callback(null, inventories);
                        }
                    })
>>>>>>> origin/jack
                }
            })
        }
    })
}

<<<<<<< HEAD
||||||| merged common ancestors
let inventoryFromRecommendations = (recommendations, callback) => {
    DBHelpers.inventoryItemsWithIds(recommendations, (err, inventories) => {
        if (err) {
            callback(err);
        } else {
            callback(null, inventories);
        }
    })
}

=======
let inventoryFromRecommendations = (recommendations, occurenceObject, callback) => {
    recommendationDB.inventoryItemsWithIds(recommendations, (err, inventories) => {
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

>>>>>>> origin/jack
let getRecommendationsFromLabels = (labels, callback) => {
    recommendationDB.getKeywordEntries(labels, (err, inventoriesWithKeywords) => {
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
    return inventoryItems.slice(0, 16);
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
    getRecommendationsForImage64,
    getRecommendationsForImageUrl,
    getRecommendationsFromLabels,
    inventoryFromRecommendations
};

// let getSample = (url, callback) => {
//     getRecommendationsFromLabels(labels, (err, recommendations, occurenceObject) => {
//         console.log(recommendations)
//         if (err) {
//             callback(err);
//         } else {
//             inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
//             getRecommendationsFromLabels(labels, (err, recommendations, occurenceObject) => {
//                 if (err) {
//                     callback(err)
//                 } else {
//                     callback(null, inventories);
//                 }
//             })
//         }
//     })
// }