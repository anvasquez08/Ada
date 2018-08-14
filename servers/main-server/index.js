const express = require("express");
const session = require('express-session');
const graph = require("express-graphql");
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')

const scraper = require('./services/scraper')

const { inventoryDB } = require('../../databases/index.js')
const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))
app.use(session({secret: 'jack', cookie: {maxAge: 1000*20*60}}));
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/auth', authRouter);

/*============== Graph QL ============== */
const gqlSchema = require('../../databases/gqlSchema.js');
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

app.get('/scrape', scraper.googleScrape)
app.get('/tags', scraper.getByTags)

app.listen(8080, () => console.info("Listening on port 8080"));


