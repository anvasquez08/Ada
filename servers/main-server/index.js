const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const googleVision = require('./recommendations/service/imageTraits.js');

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../client/dist"));

app.post('/index', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    let testID = 999;
    googleVision.indexAnalyzeInventoryItem(testID, url, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send('success');
        }
    });
    
});

app.post('/recommend', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    googleVision.getRecommendationsForURL(url, (err, recommendations) => {
        if (err) {
            res.send(err)
        } else {
            res.send(recommendations);
        }
    });
    
});

app.listen(8080, () => console.log("Listening on port 8080"));
