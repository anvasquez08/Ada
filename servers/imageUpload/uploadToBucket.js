const path = require('path');
const AWS = require('aws-sdk');
const recService = require('../recommendations/service/imageTraits.js');
const userDB = require ('../../databases/Users.js')


AWS.config.update({region: 'us-west-2'});

// Create S3 service object
s3 = new AWS.S3();

let uploadImage = (username, imageFile, callback) => {

  var uploadParams = {Bucket: 'coding-jacks-awesome-bucket', Key: '', Body: ''};
  uploadParams.Body = imageFile.data;
  uploadParams.Key = imageFile.name;

  // call S3 to retrieve upload file to specified bucket
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      callback(err);
    } else {
      console.log(username);
      console.log(data.Location);
      userDB.addHistoryToUser(username, data.Location);
      callback(null, data.location);
    }
  });
}

module.exports = {
  uploadImage
}