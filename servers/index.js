const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const axios = require('axios')
const path = require('path');

const authRouter = require('./routes/authRoutes');
// const recommendationRouter = require('./routes/recommendationRoutes');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const userDB = require('../databases/Users')
const { inventoryDB, imageDB } = require('./../databases/index.js')
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const recommendationService = require('./recommendations/service/imageTraits.js')
const helpers = require('../databases/helpers.js');

/*============== Graph QL ============== */

const { GraphQLServer } = require('graphql-yoga')
const typeDefs = `
  scalar Upload
  
  type Inventory {
    _id: ID
    name: String
    brandName: String
    url: String
    imageUrl: String
    price: Float
    timestamp: String
  }

  type Query {
    test: String 
  }

  type Mutation {
    uploadLargeFile(input: String!, name: String): [Inventory]
    singleUpload(input: Upload!): Boolean!
  }
`;
// singleUpload(input: Upload!): Boolean!
const resolvers = {
  Query: {
    test: () => "hello", 
  },
  Mutation: {
    uploadLargeFile: async (_, args) => {
      let image64 = args.input.substring(23)
      console.log(args.name)
      let result = await new Promise((resolve, reject) => {
        recommendationService.getRecommendationsForImage64(image64, (err, recommendations)  => {
          if (err) reject(err) 
          else resolve(recommendations)       
        })
      })
      return result
    },
    singleUpload: async (_, { input })  => {
      console.log(input)
      const { stream, filename, mimetype, encoding } = await input;
      console.log(filename)
      return true;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers
})

server.express.use(express.static(__dirname + "../../client/dist"))
server.express.use(bodyParser.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }));
server.express.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
server.express.use(fileUpload());
server.express.use(cors())
server.express.use(morgan("dev"));
server.express.use(session({secret: 'thecodingjack', cookie: {maxAge: 1000*20*60}}));
server.express.use(passport.initialize());
server.express.use(passport.session());
server.express.use('/auth', authRouter)


const options = {
  port: 4000,
  endpoint: '/graphql',
  playground: '/playground'
}

server.start(options, ({ port }) =>
  console.log('Server is running on http://localhost:' + port)
)

/*====================================== */

// server.express.get('/scrape', scraper.googleScrape)
// server.express.get('/tags', scraper.getByTags)

server.express.post('/index', function(req, res) {
  let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
  let testID = 999;
  recWorker.indexAnalyzeInventoryItem(testID, url, (err) => {   
    imageUpload.uploadImage(username, imageFile, (err, imageUrl) => {
        if (err) {
            res.send(err)
        } else {
            res.send('success');
            res.status(200).send(imageUrl);
        }
    });
  })
})

// //Adds inventoryId to users favorites

server.express.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
})

// //returns user's favorites

server.express.get('/favorites/:user', (req,res) => { 
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
    imageUpload.uploadImage(null, imageFile, (err, imageUrl) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(imageUrl);
        }
    })
})
})

server.express.post('/upload', (req,res) => {
    
  let imageFile = req.files.file;
  console.log("Console logging imageFile from /upload: ", imageFile);
  
  imageUpload.uploadImage(null, imageFile, (err, imageUrl) => {
      if (err) {
          res.status(500).send(err);
      } else {
          res.status(200).send(imageUrl);
      }
  })
})

// User uploads image. Saves image, adds image to user's history
server.express.post('/upload/:user', (req,res) => {
    
    let username = req.params.user;
    let imageFile = req.files.file;
    imageUpload.uploadImage(username, imageFile, (err, imageUrl) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log("Console logging imageUrl: ",imageUrl);
            res.status(200).send(imageUrl);
        }
    })
})

// //Adds inventoryId to users favorites
server.express.post('/favorites/:user/:inventoryId', (req,res) => {
    let username = req.params.user;
    let inventoryId = req.params.inventoryId;
    userDB.addFavoriteToUser(username, inventoryId);
    res.status(200).send('hope this saved. clean me up later');
})


// //returns user's favorites
server.express.get('/favorites/:user', (req,res) => { 
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (err) {
            res.status(400).send(err);
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

// //Adds inventoryId to users favorites
server.express.post('/instahistory/:user', (req,res) => {
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
server.express.get('/history/:user', (req,res) => { 
    console.log('GETTING HISTORY')
    let username = req.params.user;

    userDB.getUser(username, (err, userProfile) => {
        if (userProfile === null) {
            res.status(400).send('User not found');
        }
        res.status(200).send(userProfile.history);
    });
});

server.express.post('/recommend', function(req, res) {
    if (typeof req.body.params === 'string') {
        console.log("Receiving URL, proceeding to get recommendations from Image URL")
        let imageUrl = req.body.params
        recommendationService.getRecommendationsForImageUrl(imageUrl, (err, recommendations) => {
            if (err) {
                console.log("Error getting recommendations using image URL", err)
                res.status(500).send();
            } else {
                res.status(200).send(recommendations);
            }
        })
    } 
});

server.express.post('/recommendinsta', (req, res) => {
    console.log("Anybody out there?")
    console.log("Receiving Instagram selected photos: ", req.body.params)
    let aggregateLabels = []; // using this later, when aggregating labels
    let instagramPhotos = req.body.params;
    for (var i = 0; i < instagramPhotos.length; i++) {
        recommendationService.getRecommendationsForImageUrl(instagramPhotos[i], (err, recommendations) => {
            if (err) {
                console.log("Error getting recommendations using image URL", err)
                res.status(500).send();
            } else {
                aggregateLabels.push(recommendations);
                console.log("Console logging recommendations length: ", recommendations.length)
                // res.status(200).send(recommendations);
                console.log("Console logging aggregateLabels length", aggregateLabels.length )
                res.status(200).send();
            }
        })
    }
});

server.express.post('/recommend/:user', function(req, res) {
    let username = req.params.user;
    if (typeof req.body.params === 'string') {
        let imageUrl = req.body.params
        recommendationService.getRecommendationsForImageUrl(imageUrl, (err, recommendations) => {
            if (err) {
                console.log("Error getting recommendations using image URL", err)
                res.status(500).send();
            } else {
                if (username) {
                    userDB.addHistoryToUser(username, imageUrl);
                }
                res.status(200).send(recommendations);
            }
        })
    } 
});

// //using this endpoint starts the recommendation worker: checks inventory for new items to add to recommendation DB.
// //TODO: Run worker occasionally instead of running this test endpoint
server.express.post('/update', function(req, res) {
    recWorker.updateIndexDB((err) => {
        if (err) {
            console.log("Console logging error in /update: ", err);
        }
    });
});

server.express.post('/send', (req,res) => {
    axios.post("http://18.222.174.170:8080/send",{image: req.files.image})
    .then(({data})=>{
        label = Object.keys(data).reduce(function(a, b){ return data[a] > data[b] ? a : b });
        if (label === 't shirt') label = 'T-Shirt'
        console.log("Console logging labels destructured from /send: ", {label})
        recommendationService.getRecommendationsFromLabels(label, (err, recommendations, occurenceObject) => {
            console.log("Console logging recommendations destructured from /send: ", {recommendations})
            if (err) {
                console.log("Err in /send")
                res.send(err);
            } else {
                recommendationService.inventoryFromRecommendations(recommendations, occurenceObject, (err, inventories) => {
                    if (err) {
                        console.log("Err in /send")
                        res.send(err)
                    } else {
                        console.log("Err in /send")
                        res.send(inventories);
                    }
                })
            }
        })
        // res.send(data)
    })
})



server.express.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
})

// // app.get('/favorites', (req, res) => {
// //     res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
// // })

// // app.get('/insta', (req, res) => {
// //     res.sendFile(path.resolve(__dirname + '../../client/dist' +'/index.html'));
// // })
