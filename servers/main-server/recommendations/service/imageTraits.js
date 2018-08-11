const GOOGLE_API_KEY = require('../../../../config.js').GOOGLE_API_KEY;
const axios = require('axios');
const fs = require('fs');
const base64Img = require('base64-img');
const recommendationDB = require('../../../../databases/recommendation-db/index.js');



let indexAnalyzeInventoryItem = (inventoryID, imageURL, callback) => {
    getLabelsFromURL(imageURL, function(err, descriptions) {
        console.log('DESCRIPTIONS', descriptions)
        if (err) {
            callback(err);
        } else {
            saveItemRecommendation (inventoryID, descriptions);
            callback(null);
        }
    })
}

let getRecommendationsForURL = (url, callback) => {
    getLabelsFromURL(url, (err, labels) => {
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

let getLabelsFromURL = (imageURL, callback) => {
    base64Img.requestBase64(imageURL, function(err, response64, image64) {
        getLabels(image64.substring(22), function(err, response) {
            if (err) {
                callback(err);
            } else {
                let traits = response.data.responses[0].labelAnnotations.map(function(trait) {
                    return trait.description;
                });
                callback(null, traits);
            }
        });
    });      
}

let saveItemRecommendation = (inventoryId, itemLabels) => {
    recommendationDB.indexItem(inventoryId, itemLabels);
}

let getLabels = (imageFile, callback) => {
        axios({
            method: 'post',
            params: {key: GOOGLE_API_KEY},
            url: 'https://vision.googleapis.com/v1/images:annotate',
            data: {
                    
                "requests":[
                    {
                        "image":{
                            "content":imageFile
                        },
                        "features":[
                            {
                                "type":"LABEL_DETECTION",
                                "maxResults":5
                            }
                        ]
                    }
                ]
            }
        })
        .then(function(response) {
            console.log(response.data.responses[0].labelAnnotations);
            callback(null, response);
        }).catch(function(err) {
            callback(err);
        });
}

module.exports = {
    indexAnalyzeInventoryItem,
    getRecommendationsForURL
};