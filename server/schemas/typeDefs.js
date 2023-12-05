
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    savedCities: [City]
  }
  type City {
    _id: ID!
    CityId: String
    description: String
    name: String!
    image: String
    country: String
    overallScore: String
  }
  input savedCity {
    _id: ID!
    CityId: String
    description: String
    name: String!
    image: String
    country: String
    overallScore: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCity(input: savedCity!): User
    removeCity(CityId: ID!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;
module.exports = typeDefs;