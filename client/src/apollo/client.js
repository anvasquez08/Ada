import ApolloClient from "apollo-boost";

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
