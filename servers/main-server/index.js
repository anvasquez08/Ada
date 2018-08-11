const express = require("express");
const graph = require("express-graphql");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const { inventoryDB } = require('../../databases/index.js')

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../client/dist"));

/*============== Graph QL ============== */
const gqlSchema = require('../../databases/gqlSchema.js');
app.use("/graphql", bodyParser.json(), graph({ schema: gqlSchema,  graphiql: true  }));

// console.log('Server file',  inventoryDB )
/*====================================== */

app.listen(8080, () => console.log("Listening on port 8080"));
