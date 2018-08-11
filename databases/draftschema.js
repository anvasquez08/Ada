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