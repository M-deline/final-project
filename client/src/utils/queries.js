import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
          _id
          username
          email
          savedCities {
            cityId
           

          }
       }
    }
`;


export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      savedCities {
        cityId
        
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      savedCities 
    }
  }
`;

