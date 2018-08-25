import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { BrowserRouter } from 'react-router-dom'
import './styles/css/main.css'

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

/*Create the httpLink that will connect your ApolloClient 
    instance with the GraphQL API
const httpLink = createHttpLink({
  uri: "http://localhost:8080"
});

instantiate ApolloClient by passing in the httpLink 
    and a new instance of an InMemoryCache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});
  <ApolloProvider client={client}>
    <App />
 </ApolloProvider>, */


ReactDOM.render((
  <BrowserRouter>
    <App />
</BrowserRouter>
),document.getElementById("app"));
