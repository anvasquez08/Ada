const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const googleVision = require('./recommendations/service/imageTraits.js');
const base64Img = require('base64-img');

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../client/dist"));

app.post('/recommend', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    base64Img.requestBase64(url, function(err, response64, image64) {
        googleVision.getLabels(image64.substring(22), function(err, response) {
            if (err) {
                //res.send(err);
            } else {
                let traits = response.data.responses[0].labelAnnotations.map(function(trait) {
                    return trait.description;
                });
                let description = traits.join(', ');
                console.log(description);
            }
        });
    });
    // let result = req.body.result;
        
});

app.listen(8080, () => console.log("Listening on port 8080"));
