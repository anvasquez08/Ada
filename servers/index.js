const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require('passport');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const axios = require('axios')
const path = require('path');
const authRouter = require('./routes/authRoutes.js');
const primaryRouter = require('./routes/primaryRouter.js');
// const recommendationRouter = require('./routes/recommendationRoutes');
const imageUpload = require('./imageUpload/uploadToBucket.js');
const userDB = require('../databases/Users')
const recWorker = require('./recommendations/worker/recommendationWorker.js')
const recommendationService = require('./recommendations/service/imageTraits.js')
const helpers = require('../databases/helpers.js');
const {getSavedEditorial} = require('../databases/models_edit.js');

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
server.express.use('/', primaryRouter);


const options = {
  port: 4000,
  endpoint: '/graphql',
  playground: '/playground'
}

server.start(options, ({ port }) =>
  console.log('Server is running on http://localhost:' + port)
)

