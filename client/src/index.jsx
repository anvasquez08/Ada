import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "./components/App.jsx";
import gql from "graphql-tag";

const typeDefs = gql`
  type Inventory {
    id: ID! 
    name: String
    brandName: String
    url: String
    imageUrl: String
    price: Float
    createdAt: String
    labels: [Label]
    boolean: Boolean
  }

  type Label{
    id: ID
    key: String
  }

  type Query {
    hello: String
  }
`;

const client = new ApolloClient({
  // clientState: {
  //   typeDefs,
    // defaults: {
    //   inventory: []
    // }
    // resolvers: {
    //   Query: {
    //     filterInventory: (context, args, { cache, getCacheKey }) => {
    //      console.log('hi', args)
    //     },
    //   }
    // }
// }
});

ReactDOM.render(  
  <ApolloProvider client={client}> 
    <App /> 
  </ApolloProvider>, 
  document.getElementById("app"));

client
  .query({
    query: gql`
    {
      hello 
    }
  `
  })
  .then(result => console.log('this is the test result', result.data))
  .catch(err => console.error(err))


  // type Mutation {
  //   filterInventory(brandName: String): Inventory
  // }    inventory: Inventory
    // inventories(where: String): [Inventory]