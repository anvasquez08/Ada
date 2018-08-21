import ApolloClient from "apollo-boost";
import typeDefs from './typeDefs.js';

export const client = new ApolloClient({
  clientState: {
    typeDefs,
    defaults: {
      inventory: []
    },
    resolvers: {
      Query: {
        filterInventory: (context, args, { cache, getCacheKey }) => {
         console.log('hi', args)
        },
      }
    }
}
});
