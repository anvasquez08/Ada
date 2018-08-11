const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
<<<<<<< HEAD
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')

=======
const scraper = require('./services/scraper')
>>>>>>> master

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))

<<<<<<< HEAD
app.use('/auth', authRouter)

app.listen(8080, () => console.log("Listening on port 8080"))
=======
app.get('/scrape', scraper.googleScrape)

app.listen(8080, () => console.log("Listening on port 8080"))
>>>>>>> master
