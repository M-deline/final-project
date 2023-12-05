import React from "react";

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchCities from "./pages/SearchCities";
import SavedCities from "./pages/SavedCities";
import Navbar from "./components/Navbar";

// GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
console.log(httpLink);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
console.log(client.link);

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchCities />} />
          <Route path="/saved" element={<SavedCities />} />
          <Route
            path="*"
            element={<h1 className="display-2">Wrong page!</h1>}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;