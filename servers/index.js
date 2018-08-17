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
const gqlSchema = require('./../databases/gqlSchema.js');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const userDB = require('../databases/Users')
const recWorker = require('./recommendations/worker/recommendationWorker.js')

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


/*============== Graph QL ============== */
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

// app.get('/scrape', scraper.googleScrape)
// app.get('/tags', scraper.getByTags)


//User uploads image. Save's image, adds image to user's history
app.post('/upload/:user', (req,res) => {
    
    let imageFile = req.files.file;
    let username = req.params.user;
    
    imageUpload.uploadImage(username, imageFile, (err, recommendations) => {
        console.log('recs sent as response', recommendations)
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(recommendations);
        }
    })
    
})

//DELETE ME LATER: This is just for testing uploads with user set to testuser
// app.post('/upload', (req,res) => {
    
//     let imageFile = req.files.file;
//     let username = 'testuser';
    
//     imageUpload.uploadImage(username, imageFile, (err, recommendations) => {
//         console.log('recs sent as response', recommendations)
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             res.status(200).send(recommendations);
//         }
//     })
    
// })

//Adds inventoryId to users favorites
app.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
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
            res.status(200).send(userProfile.favorites);
        }
    })
})

//return user's image upload history
app.get('/history/:user', (req,res) => { 
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (userProfile === null) {
                res.status(400).send('User not found');
            }
            res.status(200).send(userProfile.history);
        }
    })
})

//using this endpoint starts the recommendation worker: checks inventory for new items to add to recommendation DB.
//TODO: Run worker occasionally instead of running this test endpoint
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

//Test endpoint to add user to db
app.get('/testuser', (req, res) => {
    userDB.saveUser('testuser', 'testpassword', 'testemail', 1, 'F')
    res.status(200).send('hopefully we created a test user');
}) 

app.listen(8080, () => console.log("Listening on port 8080"));
