const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('../../databases/Inventory')

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))

app.listen(8080, () => console.log("Listening on port 8080"))