const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull
} = require('graphql');

const InventoryType = new GraphQLObjectType({
  name: 'InventoryPiece',
  description: 'Type for inventory properties.', 
  fields: () => ({
    id: {
      type: GraphQLInt, 
      description: `The article's id.`
    }, 
    name: {
      type: GraphQLString, 
      description:  `The article's  name.`
    },
    brandName: {
      type: GraphQLString, 
      description:  `The article's brand name.`
    },
    url: {
      type: GraphQLString, 
      description: `The article's url.`
    }, 
    imageUrl: {
      type: GraphQLString, 
      description:  `The article's image url.`
    },
    price: {
      type: GraphQLInt, 
      description: `The article's price.`
    },
    timestamp: {
      type: GraphQLInt, 
      description:  'Insertion timestamp.'
    }
  })
})

  module.exports = { InventoryType }