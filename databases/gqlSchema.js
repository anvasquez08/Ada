const { InventoryType } = require('./gqlTypes.js');
const { Inventory } = require('./schema.js');
const { GraphQLNonNull, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType', 
    fields: {
        inventory: {
          type: new GraphQLList(InventoryType), 
        //   args: {
        //     type: {
        //         description: 'Adding new inventory.'
        //         // ,
        //         // url: new GraphQLNonNull(GraphQLString),
        //         // brandName: new GraphQLNonNull(GraphQLString),
        //         // price: new GraphQLNonNull(GraphQLString),
        //         // imageUrl: new GraphQLNonNull(GraphQLString),
        //         // visualTags: new GraphQLList( GraphQLInt )
        //     }
        //   },
          resolve: (root, args) => {
            let inventory = new Promise((resolve, reject) => {
                Inventory.find({}, (err, res) => {
                    console.log(res)
                    err ? reject(err) : resolve(res)
                })
            })
            return inventory
          }
        }
     }
  })

// add mutations
module.exports = new GraphQLSchema({
    query: RootQuery
   })
