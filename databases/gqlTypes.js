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
    url: {
      type: GraphQLString, 
      description: `The article's url.`
    }, 
    brandName: {
      type: GraphQLString, 
      description:  `The article's brand name.`
    },
    price: {
      type: GraphQLInt, 
      description: `The article's price.`
    },
    imageUrl: {
      type: GraphQLString, 
      description:  `The article's image url.`
    },
    visualTags: {
      type: new GraphQLList( GraphQLString ), 
      description: `The article's visual tags.`
    },
    timestamp: {
      type: GraphQLInt, 
      description:  'Insertion timestamp.'
    }
  })
})

  module.exports = { InventoryType }