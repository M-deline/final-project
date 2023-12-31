// import React from "react";
import 'bulma/css/bulma.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchCities from "../src/pages/SearchCities";
import SavedCities from "../src/pages/SavedCities";
import Navbar from "../src/components/Navbar";

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