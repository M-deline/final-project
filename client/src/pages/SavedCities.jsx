import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_CITY } from "../utils/mutations";
import Auth from '../utils/auth';
import { removeCityId } from '../utils/localStorage';

const SavedCities = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeCity, { error }] = useMutation(REMOVE_CITY);

  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteCity = async (cityId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeCity({
        variables: { cityId },
      });
      // upon success, remove book"s id from localStorage
      removeCityId(cityId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <Container>
      <div  className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved cities!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedCities.length
            ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'}:`
            : 'You have no saved cities!'}
        </h2>
        <Row>
          {userData.savedCities.map((city) => {
            return (
              <Card key={city.cityId} border='dark'>
              {city.image ? <Card.Img src={city.image} alt={`The cover for `} variant='top' /> : null}
              <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                {/* <p className='small'>Authors: {book.authors}</p> */}
                <Card.Text>{city.description}</Card.Text>
                <Button className='btn-block btn-danger' onClick={() => handleDeleteCity(city.cityId)}>
                  Delete this City!
                </Button>
              </Card.Body>
            </Card>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default SavedCities;