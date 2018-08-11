const express = require("express");
const graph = require("express-graphql");
const morgan = require("morgan");
const cors = require('cors')
const bodyParser = require("body-parser");
const googleVision = require('./recommendations/service/imageTraits.js');
const scraper = require('./services/scraper')
const db = require('../../databases/Inventory')
const authRouter = require('../routes/authRoutes')
const scraper = require('./services/scraper')
const { inventoryDB } = require('../../databases/index.js')

const app = express();
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../client/dist"));
app.use('/auth', authRouter)
/*============== Graph QL ============== */
const gqlSchema = require('../../databases/gqlSchema.js');
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

/*====================================== */



app.get('/scrape', scraper.googleScrape)

app.post('/index', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    let testID = 999;
    googleVision.indexAnalyzeInventoryItem(testID, url, (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send('success');
        }
    });
    
});

app.post('/recommend', function(req, res) {
    let url = 'http://greenwoodhypno.co.uk/wp-content/uploads/2014/09/test-image.png'
    googleVision.getRecommendationsForURL(url, (err, recommendations) => {
        if (err) {
            res.send(err)
        } else {
            res.send(recommendations);
        }
    });
    
});

app.listen(8080, () => console.log("Listening on port 8080"));
