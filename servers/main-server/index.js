const express = require("express");
const graph = require("express-graphql");
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')
// const scraper = require('./services/scraper')
const { inventoryDB } = require('../../databases/index.js')
const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))
app.use('/auth', authRouter)

/*============== Graph QL ============== */
const gqlSchema = require('../../databases/gqlSchema.js');
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */

// app.get('/scrape', scraper.googleScrape)
// app.get('/tags', scraper.getByTags)

app.listen(8080, () => console.info("Listening on port 8080"));


