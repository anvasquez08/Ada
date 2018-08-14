const path = require('path');
const AWS = require('aws-sdk');


AWS.config.update({region: 'us-west-2'});

// Create S3 service object
s3 = new AWS.S3();

let uploadImage = (imageFile, callback) => {

  var uploadParams = {Bucket: 'coding-jacks-awesome-bucket', Key: '', Body: ''};
  
  //var file = '/Users/jonathanizak/Downloads/bman.jpg';

  // var fs = require('fs');
  // var fileStream = fs.createReadStream(file);
  // fileStream.on('error', function(err) {
  //   console.log('File Error', err);
  // });

  uploadParams.Body = imageFile.data;
  uploadParams.Key = imageFile.name;

  // call S3 to retrieve upload file to specified bucket
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data.Location);
    }
  });
}

module.exports = {
  uploadImage
}