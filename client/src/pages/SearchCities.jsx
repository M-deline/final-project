import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveCityIds, getSavedCityIds } from '../utils/localStorage';
import { saveCity, searchNomadCities } from '../utils/API';

//to fix mobile view use react response docs 
import { useMediaQuery } from 'react-responsive';

import { SAVE_CITY} from '../utils/mutations';
import {useMutation} from '@apollo/client';

//use navigate instead of useHistory 
import { useNavigate } from 'react-router-dom';
import Africa from '../assets/images/Africa.png';
import Asia from '../assets/images/Asia.png';
import Australia from '../assets/images/Australia.png';
import Europe from '../assets/images/Europe.png';
import NorthAmerica from '../assets/images/Namerica.png';
import SouthAmerica from '../assets/images/Samerica.png';


const SearchCities = () => {
  // create state for holding returned api data
  const [searchedCities, setSearchedCities] = useState([]);


  const [saveCity, { error }] = useMutation(SAVE_CITY);

  // create state to hold saved CityId values
  const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  useEffect(() => {
    return () => saveCityIds(savedCityIds);
  });


  const handleAfricaClick = async () => {
    const searchInput = 'africa';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.name,
        name: city.name,
        description: city.population,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }

   

  };
  const handleAsiaClick = async () => {
    const searchInput = 'asia';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.id,
        name: city.name,
        description: city.description,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }

    
  };
  const handleAustraliaClick = async () => {
    const searchInput = 'oceania';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.id,
        name: city.name,
        description: city.description,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }

    
  }
  const handleEuropeClick = async () => {
    const searchInput = 'europe';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.id,
        name: city.name,
        description: city.description,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }


  }
  const handleNorthAmericaClick = async () => {
    const searchInput = 'north-america';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.id,
        name: city.name,
        description: city.description,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }

  
  }
  const handleSouthAmericaClick = async () => {
    const searchInput = 'latin-america';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.id,
        name: city.name,
        description: city.description,
        image: city.image || '',
      }));


      setSearchedCities(cityData);
    } catch (err) {
      console.error(err);
    }

  }



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
      <div className="has-text-light has-background-dark p-5">
        <div className="container">
          <h1 className="title">Search for Cities!</h1>
          <div className='container' id='images'>
            <img src={Africa} alt="africa" onClick={handleAfricaClick} />
            <img src={Asia} alt="asia" onClick={handleAsiaClick} />
            <img src={Australia} alt="oceania" onClick={handleAustraliaClick} />
            <img src={Europe} alt="europe" onClick={handleEuropeClick} />
            <img src={NorthAmerica} alt="north-america" onClick={handleNorthAmericaClick} />
            <img src={SouthAmerica} alt="latin-america" onClick={handleSouthAmericaClick} />
          </div>

        </div>
      </div>

      <div className="container">
        <h2 className='pt-5 title'>
          {searchedCities.length
            ? `Viewing ${searchedCities.length} results:`
            : 'Search for a country to begin!'}
        </h2>
        {/* about us so that users know how this app works, moight have to change a bit once routes to search work depending on how it renders */}
        <div className="container">
          <br></br>
          <h1 className='title'>About Us</h1>
          <p className="subtitle">Welcome to [name of app]! This app was created for digital nomads or anyone who loves to travel and would like to view cities all around the world that matches their criteria. Simply start a search to begin and view a list of cities. If you like a city and want to add it to your list to view later, please sign up and make an account to save it to look at it later. </p>
        </div>

        <div className="columns is-multiline">
          {searchedCities.map((city) => {
            return (
              <div className="column is-4" key={city.name}>
                <div className="card">
                  {city.image ? (
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={city.image} alt={`The cover for ${city.cityId}`} />
                      </figure>
                    </div>
                  ) : null}
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{city.name}</p>
                        <p className="subtitle is-6">{city.description}</p>
                      </div>
                    </div>
                    {Auth.loggedIn() && (
                      <button
                        disabled={savedCityIds?.some((savedCityId) => savedCityId === city.cityId)}
                        className='button is-fullwidth is-info'
                        onClick={() => handleSaveCity(city.cityId)}>
                        {savedCityIds?.some((savedCityId) => savedCityId === city.cityId)
                          ? 'This City has already been saved!'
                          : 'Save this City!'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchCities;
