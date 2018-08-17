const express = require("express");
const graph = require("express-graphql");
const morgan = require("morgan");
const passport = require('passport')
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const axios = require('axios')

const authRouter = require('./routes/authRoutes')
const gqlSchema = require('./../databases/gqlSchema.js');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const { inventoryDB, imageDB } = require('./../databases/index.js')
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const recommendationService = require('./recommendations/service/imageTraits.js');
// const AWS = require('aws-sdk');
// AWS.config.update({region: 'us-west-2'});
// const rekognition = new AWS.Rekognition();
// const scraper = require('./services/scraper') // Fix

const app = express();
app.use(fileUpload());
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "../../client/dist"));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)

/*============== Graph QL ============== */
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

app.get('/scrape', scraper.scrape.bind(this,'zara'))
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

// app.post('/recommend', function(req, res) {
//     let url = 'https://coding-jacks-awesome-bucket.s3.us-west-2.amazonaws.com/018993_BPI_KIDS_OWL_KIDS_HAT_AW15_3_l.jpg'
//     recommendationService.getRecommendationsForURL(url, (err, recommendations) => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send(recommendations);
//         }
//     });
    
// });

app.post('/upload', (req,res) => {
    
    let imageFile = req.files.file;
    
    imageUpload.uploadImage(imageFile, (err, recommendations) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(recommendations);
        }
    })
    
   })

app.post('/update', function(req, res) {
    recWorker.updateIndexDB((err) => {
        if (err) {
            console.log(err);
        }
    });
});

app.post('/send', (req,res) => {
    axios.post("http://18.222.174.170:8080/send",{image: req.files.image})
    .then(({data})=>{
      res.send(data)
    })
})

app.listen(8080, () => console.log("Listening on port 8080"));
