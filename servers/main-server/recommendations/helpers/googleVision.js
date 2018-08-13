const GOOGLE_API_KEY = require('../../../../config.js').GOOGLE_API_KEY;
const axios = require('axios');
const base64Img = require('base64-img');

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
        callback(null, response);
    }).catch(function(err) {
        callback(err);
    });
}

module.exports = {
    getLabelsFromURL
}