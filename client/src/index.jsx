import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

<<<<<<< HEAD
// import { ApolloProvider } from "react-apollo";
// import { ApolloClient } from "apollo-client";
||||||| merged common ancestors
import { ApolloProvider } from "react-apollo";
<<<<<<< HEAD
import { ApolloClient } from "apollo-client";
=======
import { _polloClient } from "apollo-client";
=======
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
>>>>>>> a26d7a9923f0f11effcd0c33b769997fd6ff4512
>>>>>>> master
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// Create the httpLink that will connect your ApolloClient 
    // instance with the GraphQL API
// const httpLink = createHttpLink({
//   uri: "http://localhost:8080"
// });

//instantiate ApolloClient by passing in the httpLink 
    // and a new instance of an InMemoryCache
// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache()
// });

<<<<<<< HEAD
ReactDOM.render(

    <App />
,
  document.getElementById("app")
);

// {/* <ApolloProvider client={client}> */   </ApolloProvider>}
||||||| merged common ancestors
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
=======
ReactDOM.render(<App />, document.getElementById("app"));

  // <ApolloProvider client={client}>
    //<App />
  /* </ApolloProvider>, */
>>>>>>> a26d7a9923f0f11effcd0c33b769997fd6ff4512
