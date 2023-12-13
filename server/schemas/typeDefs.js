
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    savedCities: [String]
  }
  type City {
    
    cityId: String
   
    
    

  }
  input savedCity {
    
    cityId: String
 
    
    

  }
  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User

    getCities: [City]

  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveCity(userId: ID!, cityId: String!): User
    removeCity(userId: ID!, cityId: String!): User
  }
  type Auth {
    token: ID!
    user: User
  }
`;
module.exports = typeDefs;