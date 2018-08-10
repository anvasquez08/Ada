const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const scraper = require('./services/scraper')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))

app.get('/scrape', scraper.googleScrape)

app.listen(8080, () => console.log("Listening on port 8080"))