const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require("apollo-server-express");

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: authMiddleware,
  persistedQueries: false, 
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/dist'), {
  setHeaders: (res, path) => {
      if (path.endsWith('.jsx')) {
          res.setHeader('Content-Type', 'application/javascript');
      }
  }
}));

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname+'/client/dist/index.html'))
  });
}

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

const PORT = process.env.PORT || 3001;

// create a new instance of Apollo Server using GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server now running on port ${PORT}!`);
      console.log(server.graphqlPath);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
};

// start server
startApolloServer(typeDefs, resolvers);