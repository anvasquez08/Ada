const express = require("express");
// const graph = require("express-graphql");
const session = require("express-session");
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const axios = require('axios')

const authRouter = require('./routes/authRoutes');
// const gqlSchema = require('./../databases/gqlSchema.js');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const { inventoryDB, imageDB } = require('./../databases/index.js')
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const recommendationService = require('./recommendations/service/imageTraits.js');

const app = express();
app.use(fileUpload());
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: 1024 * 1024 * 2000, type: 'application/json' }));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(express.static(__dirname + "../../client/dist"));
// app.use(session({secret: 'jack', cookie: {maxAge: 1000*20*60}}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRouter)

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
    uploadLargeFile(input: String!): [Inventory]
    singleUpload(input: Upload!): Boolean!
  }
`;

const resolvers = {
  Query: {
    test: () => "hello", 
  },
  Mutation: {
    uploadLargeFile: async (_, args) => {
      let image64 = args.input.substring(23)
      let result = await new Promise((resolve, reject) => {
        recommendationService.getRecommendationsForImage64(image64, (err, recommendations)  => {
          if (err) reject(err) 
          else resolve(recommendations)       
        })
      })
      console.log(result)
      return result
    },
    singleUpload: async (_, { input })  => {
      const { stream, filename, mimetype, encoding } = await input;
      return true;
    }
  },
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers
})

server.express.use(express.static(__dirname + "../../client/dist"))
const options = {
  port: 4000,
  endpoint: '/graphql',
  playground: '/playground'
}

server.start(options, ({ port }) =>
  console.log('Server is running on http://localhost:' + port)
)


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


// app.post('/recommend', function(req, res) {
//     let image64 = req.body.file.substring(23);

//     recommendationService.getRecommendationsForImage64(image64, (err, recommendations) => {
//         if (err) {
//           console.log(err);
//           res.status(500).send();
//         } else {
//             // console.log(recommendations);
//             res.status(200).send(recommendations);
//         }
//       })

// });

app.post('/upload', (req,res) => {
    
    let imageFile = req.files.image;
    console.log(imageFile);
    
    imageUpload.uploadImage(imageFile, (err, imageUrl) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send();
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

// app.listen(8080, () => console.log("RESTful server listening on port 8080"));

/* ============== */
    // inventories: (context, {where}) => where ? inventory.filter(elem => elem.brandName === where): inventory,

// type Mutation {
//   singleUpload(file: Upload!): Upload
// filterInventory(brandName: String): Inventory
// }
// file: Upload!
// upload: [Inventory]
// // /
// type Query {
//   hello: String
//   inventory(file: Upload!): [Inventory]
//   recommendations(imageUrl: String!) : [Inventory]
// }

// const typeDefs = gql`

//   type File {
//     id: ID!
//     path: String!
//     filename: String!
//     mimetype: String!
//     encoding: String!
//   }

//   type Inventory {
//     id: ID! 
//     name: String
//     brandName: String
//     url: String
//     imageUrl: String
//     price: Float
//     createdAt: String
//     labels: [Label]
//   }

//   type Label{
//     id: ID
//     key: String
//   }

//   type Query {
//     hello: String
//     uploads: [File]
//   }

//   type Mutation {
//     singleUpload(file: Upload!): [Inventory]
//     getInventory(brandName: String) : [Inventory]
//   }
// `;

// const resolvers = {
//   Upload: GraphQLUpload,
//   Query: {
//     hello: () => 'Hello world!',
//     // inventory: (context, args) => {return [{name: 'Hello'}]},
//     // recommendations: (context, args) => {
//     //   console.log('hitting recommendations', context, args)
//     //   return inventory
//     // },
//     uploads: (context, args) => {
//       console.log('hitting uploads in query')
//     }

//   },
//   Mutation: {
//     async singleUpload(parent, { file }) {
//       const { stream, filename, mimetype, encoding } = await file;
//       console.log('hitting mutation', filename)
//       return  inventory
//     },
//     getInventory: (parent, args) => {
//       console.log('getting here')
//       return inventory
//     }
//   }
// }