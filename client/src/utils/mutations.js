import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_CITY = gql`
  mutation saveCity($userId: ID!, $cityId: String!) {
    saveCity(userId: $userId, cityId: $cityId) {
      _id
      username
      email
      savedCities {
        cityId
    
        
      }
    }
  }
`;

export const REMOVE_CITY = gql`
  mutation removeCity($userId: ID!, $cityId: String!) {
    removeCity(userId: $userId, cityId: $cityId) {
      _id
      username
      email
      savedCities 
    }
  }
`;