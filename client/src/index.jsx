import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import App from "./components/App.jsx";
import gql from "graphql-tag";

const client = new ApolloClient({  
  clientState: {
    defaults: {},
    resolvers:{},
    typeDefs: {}
  }
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

export default client;