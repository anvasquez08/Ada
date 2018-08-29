import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { BrowserRouter } from 'react-router-dom'
import './styles/css/main.css'

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client'
import { ApolloProvider ,  createNetworkInterface } from "react-apollo";

 const client = new ApolloClient({
  link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render( 
  <ApolloProvider client={client}> 
    <BrowserRouter>
      <App />      
    </BrowserRouter>
  </ApolloProvider>, document.getElementById("app")
);

export default client;

