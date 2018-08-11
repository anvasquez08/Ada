const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')

const scraper = require('./services/scraper')

const app = express()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))
app.use(passport.initialize());
app.use(passport.session());

// Routers
app.use('/auth', authRouter)
app.get('/scrape', scraper.googleScrape)

app.listen(8080, () => console.log("Listening on port 8080"))