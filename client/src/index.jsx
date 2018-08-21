import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import App from "./components/App.jsx";
import typeDefs from './apollo/typeDefs.js';
import client from './apollo/client.js'

ReactDOM.render(  
  <ApolloProvider client={client}> 
    <App />  
  </ApolloProvider>, 
  document.getElementById("app"));
