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
  mutation saveCity($cityData: savedCity!) {
    saveCity(input: $cityData) {
      _id
      username
      email
      savedCities {
        cityId
        name
        
      }
    }
  }
`;

export const REMOVE_CITY = gql`
  mutation saveCity($cityData: savedCity!) {
    saveCity(input: $cityData) {
      _id
      username
      email
      savedCitied {
        cityId
        name
        country
        description
        image
        overallScore
      }
    }
  }
`;