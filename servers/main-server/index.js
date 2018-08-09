const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')


const app = express()
app.use(express.static(__dirname + '/client/dist'))
app.use(morgan('dev'))
app.use(bodyParser.json())

app.listen(8080, () => console.log("Listening on port 8080"))