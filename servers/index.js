const express = require("express");
const graph = require("express-graphql");
const session = require("express-session");
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const axios = require('axios')
const authRouter = require('./routes/authRoutes');
// const recommendationRouter = require('./routes/recommendationRoutes');
const gqlSchema = require('./../databases/gqlSchema.js');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const userDB = require('../databases/Users')
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const recommendationService = require('./recommendations/service/imageTraits.js')
const helpers = require('../databases/helpers.js');
const path = require('path');

const app = express();
app.use(fileUpload());
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "../../client/dist"));
app.use(session({secret: 'jack', cookie: {maxAge: 1000*20*60}}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)
// app.use('/recommend', recommendationRouter);


/*============== Graph QL ============== */
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

// app.get('/scrape', scraper.googleScrape)
// app.get('/tags', scraper.getByTags)


//User uploads image. Save's image, adds image to user's history

app.post('/upload/:user', (req,res) => {
    
    let username = req.params.user;
    let imageFile = req.files.image;

    console.log("Console logging username from /upload/:user ", username);
    
    imageUpload.uploadImage(username, imageFile, (err, imageUrl) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log("Console logging imageUrl: ",imageUrl);
            res.status(200).send(imageUrl);
        }
    })
})

app.post('/upload', (req,res) => {
    
    let imageFile = req.files.image;
    console.log(imageFile);
    
    imageUpload.uploadImage(null, imageFile, (err, imageUrl) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(imageUrl);
        }
    })
})

//Adds inventoryId to users favorites
app.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
    res.status(200).send('hope this saved. clean me up later');
})


//returns user's favorites
app.get('/favorites/:user', (req,res) => { 
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (userProfile === null) {
                res.status(400).send('User not found');
            }
            helpers.inventoryItemsWithIds(userProfile.favorites, (err, favorites) => {
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).send(favorites);
                }
            })
        }
    })
})

//Adds inventoryId to users favorites
app.post('/instahistory/:user', (req,res) => {
    let username = req.params.user;
    let inventoryIDs = req.body.photos;
    console.log('username', username);
    console.log('inventoryIds', inventoryIDs);
    inventoryIDs.forEach(photoUrl => {
        userDB.addHistoryToUser(username, photoUrl);
    });
    res.status(200).send('hope these saved. clean me up later')
})

//return user's image upload history
app.get('/history/:user', (req,res) => { 
    console.log('GETTING HISTORY')
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (userProfile === null) {
            res.status(400).send('User not found');
        }
        res.status(200).send(userProfile.history);
    });
});

/* Will use graph ql route. */

app.post('/recommend', function(req, res) {
    let image64 = req.body.file.substring(23);

    recommendationService.getRecommendationsForImage64(image64, (err, recommendations) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            console.log("Console logging recommendations here: ", recommendations);
            res.status(200).send(recommendations);
        }
    })
});

//using this endpoint starts the recommendation worker: checks inventory for new items to add to recommendation DB.
//TODO: Run worker occasionally instead of running this test endpoint
app.post('/update', function(req, res) {
    recWorker.updateIndexDB((err) => {ee
        if (err) {
            console.log(err);
        }
    });
});

app.post('/send', (req,res) => {
    axios.post("http://18.222.174.170:8080/send",{image: req.files.image})
    .then(({data})=>{
        label = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
        if (label === 't shirt') label = 'T-Shirt'
        console.log({label})
        recommendationService.getRecommendationsFromLabels(label, (err, recommendations, occurenceObject) => {
            console.log({recommendations})
            if (err) {
                res.send(err);
            } else {
                recommendationService.inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send(inventories);
                    }
                })
            }
        })
        // res.send(data)
    })
})



app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
})

// app.get('/favorites', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
// })

// app.get('/insta', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
// })

app.listen(8080, () => console.log("Listening on port 8080"));
