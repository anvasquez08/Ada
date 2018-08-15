// // const express = require("express");
// // const graph = require("express-graphql");
// // const morgan = require("morgan");
// // const passport = require('passport')
// // const cors = require('cors')
// // const bodyParser = require("body-parser");
// // const fileUpload = require('express-fileupload');

// <<<<<<< HEAD
// const fs = require('fs');
// const axios = require("axios")
// =======
// <<<<<<< HEAD
// >>>>>>> dev
// const passport = require('passport')
// const db = require('../../databases/Inventory')
// const authRouter = require('../routes/authRoutes')
// const cors = require('cors')
// const bodyParser = require("body-parser");
// const recommendationService = require('./recommendations/service/imageTraits.js');
// const recWorker = require('./recommendations/worker/recommendationWorker.js')
// const fileUpload = require('express-fileupload');
// const imageUpload = require('./imageUpload/uploadToBucket.js');
// const { inventoryDB } = require('../../databases/index.js')
// <<<<<<< HEAD
// const multer = require('multer');

// let upload = multer({dest: 'uploads/'});
// =======
// =======
// // const scraper = require('./services/scraper')
// // const authRouter = require('../routes/authRoutes')
// // const recWorker = require('./recommendations/worker/recommendationWorker.js')
// // const imageUpload = require('./imageUpload/uploadToBucket.js');
// // const recommendationService = require('./recommendations/service/imageTraits.js');
// // const { inventoryDB, imageDB } = require('../../databases/index.js')
// >>>>>>> 2995f39f57e143d11288a3e0ad371d33347a4f59

// // const app = express();
// // app.use(fileUpload());
// // app.use(cors())
// // app.use(morgan("dev"));
// // app.use(bodyParser.json());
// // app.use(express.static(__dirname + "/../../client/dist"));
// // app.use(passport.initialize());
// // app.use(passport.session());
// // app.use('/auth', authRouter)
// >>>>>>> dev

// <<<<<<< HEAD
// const app = express();
// app.use(fileUpload());
// app.use(cors())
// app.use(morgan('dev'))
// app.use(bodyParser.json())
// app.use(express.static(__dirname + '/../../client/dist'))
// app.use(session({secret: 'jack', cookie: {maxAge: 1000*20*60}}));
// app.use(passport.initialize());
// app.use(passport.session());

// // Routers
// app.use('/auth', authRouter);
// =======
// // /*============== Graph QL ============== */
// // const gqlSchema = require('../../databases/gqlSchema.js');
// // app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));
// >>>>>>> master

// // /*====================================== */

// // app.get('/scrape', scraper.googleScrape)
// // app.get('/tags', scraper.getByTags)

// // app.post('/index', function(req, res) {
// //     let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
// //     let testID = 999;
// //     recWorker.indexAnalyzeInventoryItem(testID, url, (err) => {
// //         if (err) {
// //             res.send(err)
// //         } else {
// //             res.send('success');
// //         }
// //     });
    
// // });

// // app.post('/recommend', function(req, res) {
// //     let url = 'https://coding-jacks-awesome-bucket.s3.us-west-2.amazonaws.com/018993_BPI_KIDS_OWL_KIDS_HAT_AW15_3_l.jpg'
// //     recommendationService.getRecommendationsForURL(url, (err, recommendations) => {
// //         if (err) {
// //             res.send(err)
// //         } else {
// //             res.send(recommendations);
// //         }
// //     });
    
// // });

// // app.post('/upload', (req,res) => {
// //     let imageFile = req.files.file;
// //     imageUpload.uploadImage(imageFile, (err, fileURL) => {
// //         if (err) {
// //             console.log(err);
// //             res.status(400).send(err);
// //         } else {
// //             console.log(fileURL)
// //         }
// //     })
    
// //   })

// // app.post('/update', function(req, res) {
// //     recWorker.updateIndexDB();
// // });

// <<<<<<< HEAD
// app.post('/send', (req,res) => {
//     axios.post("http://18.222.174.170:8080/send",{image: req.files.image})
//     .then(({data})=>{
//       res.send(data)
//     })
// })

// app.listen(8080, () => console.log("Listening on port 8080"));
// =======
// // app.listen(8080, () => console.log("Listening on port 8080"));
// >>>>>>> dev
