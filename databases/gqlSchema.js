const { InventoryType } = require('./gqlTypes.js');
const { Inventory } = require('./schema.js');
const { GraphQLNonNull, GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');

/* == Submit image and return recommendations from inventory. == */
/* Image to be sent to image server. */

const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType', 
    fields: {
        inventory: {
          type: new GraphQLList(InventoryType), 
          args: {
            imageUrl: {
                name: 'imageURL',
                description: 'Searching for recommendations based on URL.', 
                type: new GraphQLNonNull(GraphQLString),
            }
          },
          resolve: (root, {imageUrl}) => {
            /* TODO: Logic to save to image DB */
            console.log(imageUrl)
            /* TODO: Add Analysis logis for image url. */


            /* TODO: Logic to pic inventory based on tags */
            let inventory = new Promise((resolve, reject) => {
                Inventory.find({}, (err, res) => {
                    err ? reject(err) : resolve(res)
                })
            })
            return inventory
          }
        }
     }
  })

// add mutations
module.exports = new GraphQLSchema({ query: RootQuery })

   /* 
NOTES: 
   1) QUERY TO SUBMIT IMAGE AND RETURN RECOMMENDATIONS
    {
        inventory(imageUrl: "https://stackoverflow.com/q") {
            brandName
            [ * ETC *]
        } 
    }
    2) MUTATION TO ADD CLOTHING PIECE TO CLOTHING DB
   */


   /*
DRAFT ASOS QUERY: 
const axios = require('axios');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
  } = require('graphql');

  const AsosJeansType = new GraphQLObjectType({
    name: 'Jeans',
    description: 'Type to query asos API for jeans', 
    fields: () => ({
      searchTerm: {
        type: GraphQLString, 
        description: 'The initial search term.'
        }, 
      id: {
        type: new GraphQLList( GraphQLInt), 
        description:  'The article id.'
      },
      name: {
        type: new GraphQLList( GraphQLInt), 
        description:  'The article name.'
      }
    })
  })
  
  const RootQuery = new GraphQLObjectType({ 
    name: 'RootQueryType', 
    fields: {
        jeans: {
          type: AsosJeansType, 
          args: {
            type: {
                description: 'The type of clothing',
                type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: (root, {type}) => {
            return axios.get(`https://api.asos.com/product/search/v1/?q=${type}&store=1&lang=en-GB&sizeschema=US&currency=GBP&sort=freshness&channel=mobile-app&offset=0&limit=1`)
            .then(response => response.data)
          }
        }
     }
  })

  module.exports = new GraphQLSchema({
    query: RootQuery
   })
   */