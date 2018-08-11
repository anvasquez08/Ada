const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')


const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../../client/dist'))

app.use('/auth', authRouter)

app.listen(8080, () => console.log("Listening on port 8080"))