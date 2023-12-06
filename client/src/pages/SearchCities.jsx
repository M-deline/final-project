import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveCityIds, getSavedCityIds } from '../utils/localStorage';
import { saveCity, searchNomadCities } from '../utils/API';

import { SAVE_CITY} from '../utils/mutations';
import {useMutation} from '@apollo/client';

const SearchCities = () => {
  // create state for holding returned google api data
  const [searchedCities, setSearchedCities] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [saveCity, {error }] = useMutation(SAVE_CITY);

  // create state to hold saved CityId values
  const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  // set up useEffect hook to save `savedCityIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCityIds(savedCityIds);
  });

  // create method to search for Citys and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchNomadCities(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const cityData = items.map((city) => ({
        cityId: city.id,
        
        name: city.name,
        description: city.description,
        image: city.image|| '',
      }));


      setSearchInput('');
      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving city to our database
  const handleSaveCity = async (cityId) => {
    // find the city  by the matching id
    const cityToSave = searchedCities.find((city) => city.cityId === cityId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveCity({
        variables: { cityData: { ...cityToSave } },
      });

      // if city successfully saves to user's account, save city id to state
      setSavedCityIds([...savedCityIds, cityToSave.cityId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Cities!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a city'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedCities.length
            ? `Viewing ${searchedCities.length} results:`
            : 'Search for a country to begin'}
        </h2>
        <Row>
          {searchedCities.map((city) => {
            return (
              <Col md="4" key={city.cityId}>
                <Card border='dark'>
                  {city.image ? (
                    <Card.Img src={city.image} alt={`The cover for ${city.name}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{city.name}</Card.Title>
                    {/* <p className='small'>Authors: {City.authors}</p> */}
                    <Card.Text>{city.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedCityIds?.some((savedCityId) => savedCityId === city.cityId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveCity(City.CityId)}>
                        {savedCityIds?.some((savedCityId) => savedCityId === city.cityId)
                          ? 'This City has already been saved!'
                          : 'Save this City!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchCities;