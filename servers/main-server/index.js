const express = require("express");
const graph = require("express-graphql");
const morgan = require("morgan");

const passport = require('passport')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')
const cors = require('cors')
const bodyParser = require("body-parser");
const recommendationService = require('./recommendations/service/imageTraits.js');
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const fileUpload = require('express-fileupload');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const { inventoryDB } = require('../../databases/index.js')


const app = express();
app.use(fileUpload());
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../client/dist"));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)

/*============== Graph QL ============== */
const gqlSchema = require('../../databases/gqlSchema.js');
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

// app.get('/scrape', scraper.googleScrape)
// app.get('/tags', scraper.getByTags)

app.post('/index', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    let testID = 999;
    recWorker.indexAnalyzeInventoryItem(testID, url, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send('success');
        }
    });
    
});

app.post('/recommend', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    recommendationService.getRecommendationsForURL(url, (err, recommendations) => {
        if (err) {
            res.send(err)
        } else {
            res.send(recommendations);
        }
    });
    
});

app.post('/upload', (req,res) => {
    let imageFile = req.files.file;
    imageUpload.uploadImage(imageFile, (err, fileURL) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            console.log(fileURL)
        }
    })
    
  })

app.post('/update', function(req, res) {
    recWorker.updateIndexDB();
});

app.listen(8080, () => console.log("Listening on port 8080"));
