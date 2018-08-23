var i2b = require("imageurl-base64");
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
const rekognition = new AWS.Rekognition();


let getLabelsFromUrl = (imageURL, callback) => {
    //Create base64 string from image
    i2b(imageURL, function(err, image64){
        if (image64) {
            getLabels(image64.base64, function(err, response) {
                if (err) {
                    callback(err);
                } else {
                    let traits = response.Labels.map(function(trait) {
                        return trait.Name;
                    });
                    console.log("Logging out traits from getLabelsFromURL: ", traits);
                    callback(null, traits);
                }
            });
        }
        else {
        }
    });      
}

let getLabelsFromImage64 = (image64, callback) => {
    if (image64) {
        getLabels(image64, function(err, response) {
            if (err) {
                callback(err);
            } else {
                let traits = response.Labels.map(function(trait) {
                    return trait.Name;
                });
                callback(null, traits);
            }
        });
    }
}

let getLabels = (imageFile, callback) => {
    let params = {
        Image: {
            Bytes: new Buffer(imageFile, 'base64')
        }, 
        MaxLabels: 123, 
        MinConfidence: 70
        };

    rekognition.detectLabels(params, function (err, data) {
        console.log('Hitting AWS Rekognition');
        if (err) {
            console.log("Console logging error from rekognition: ", err)
            callback(err.stack);
        } else {
            callback(null, data);
        }
    });
}

module.exports = {
    getLabelsFromUrl,
    getLabelsFromImage64
}