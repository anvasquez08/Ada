const GOOGLE_API_KEY = require('../../../../config.js').GOOGLE_API_KEY;
const axios = require('axios');
const FileReader = require('filereader');
const fs = require('fs');

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

module.exports.getLabels = getLabels;