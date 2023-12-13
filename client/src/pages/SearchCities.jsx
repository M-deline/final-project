import { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveCityIds, getSavedCityIds } from '../utils/localStorage';
import { searchNomadCities } from '../utils/API';


//to fix mobile view use react response docs 
import { useMediaQuery } from 'react-responsive';

import { useMutation } from '@apollo/client';
import { SAVE_CITY } from '../utils/mutations';

//use navigate instead of useHistory 
import { useNavigate } from 'react-router-dom';
import Africa from '../assets/images/Africa.png';
import Asia from '../assets/images/Asia.png';
import Australia from '../assets/images/Australia.png';
import Europe from '../assets/images/Europe.png';
import NorthAmerica from '../assets/images/Namerica.png';
import SouthAmerica from '../assets/images/Samerica.png';


const SearchCities = () => {
  const userId = (Auth.loggedIn() && Auth.getProfile().data._id) ? Auth.getProfile().data._id : null;
  
  // create state for holding returned google api data
  const [searchedCities, setSearchedCities] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  const [saveCity, { error, data}] = useMutation(SAVE_CITY);
  const [cityId, setCityId] = useState('');

  // create state to hold saved CityId values
  const [savedCityIds, setSavedCityIds] = useState(getSavedCityIds());

  const history = useNavigate();

  //for mobile view
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });


  const handleAfricaClick = async () => {
    const searchInput = 'africa';

    try {
      const items = await searchNomadCities(searchInput);

      const cityData = items.map((city) => ({
        cityId: city.name,
        name: city.name,
        description: city.description,
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
        cityId: city.name,
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

    
    history.push('/results');
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

    
    history.push('/results');
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

    
    history.push('/results');
  };

  //to fix mobile view

  const handleInputChange = (event) => {
    setSearchInput(event.target.value.toLowerCase());
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();

    switch (searchInput) {
      case 'africa':
        handleAfricaClick();
        break;
      case 'asia':
        handleAsiaClick();
        break;
      case 'oceania':
        handleAustraliaClick();
        break;
      case 'europe':
        handleEuropeClick();
        break;
      case 'north america':
        handleNorthAmericaClick();
        break;
      case 'latin america':
        handleSouthAmericaClick();
        break;
      default:
        console.error('Invalid continent name');
    }

    setSearchInput('');
  };

  // set up useEffect hook to save `savedCityIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCityIds(savedCityIds);
  });



  // create function to handle saving city to our database
  const handleSaveCity = async (cityId) => {
    
    
    
    
    setCityId(cityId);


    try {
      const { data } = await saveCity({
        variables: { userId, cityId},
      });

      // if city successfully saves to user's account, save city id to state
      setSavedCityIds([...savedCityIds, data.cityId]);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="container">
        <h2 id="search-title" className='pt-5 title'>
          {searchedCities.length
            ? `Viewing ${searchedCities.length} results:`
            : 'Digital Nomads'}
        </h2>
        <div className="container">
          <br></br>
          <h1 id="about-us" className='title'>About Us</h1>
          <p className="subtitle">Welcome to Digital Nomads! This app was created for digital nomads or anyone who loves to travel and would like to view cities all around the world that matches their criteria. Simply start a search to begin and scroll down to view a list of cities. If you like a city and want to add it to your list to view later, please sign up and make an account!</p>
          <br></br>
          <br></br>
        </div>
        <div id="light-blue" className="has-text-light p-5">
          <div className="container">
            <h1 className="title">Choose a Continent to Begin!</h1>
            <div id='images' className='image-container'>
              {isMobile ? (
                <form id="mobile-search" onSubmit={handleInputSubmit}>
                  <input
                    type='text'
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder='Enter continent name'
                  />
                  <button type='submit'>Submit</button>
                </form>
              ) : (
                <>
                  <div id='top-continents' className="center-images">
                    <img id='north-america' src={NorthAmerica} alt="north-america" onClick={handleNorthAmericaClick} />
                    <div id='europe-asia' className="center-images">
                      <img id='europe' src={Europe} alt="europe" onClick={handleEuropeClick} />
                      <img id='asia' src={Asia} alt="asia" onClick={handleAsiaClick} />
                    </div>
                  </div>
                  <div id='middle-continents' className="center-images">
                    <img id='south-america' src={SouthAmerica} alt="latin-america" onClick={handleSouthAmericaClick} />
                    <img id='africa' src={Africa} alt="africa" onClick={handleAfricaClick} />
                  </div>
                  <div id='bottom-continents'>
                    <img id='oceania' src={Australia} alt="oceania" onClick={handleAustraliaClick} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <br></br>
        <div className="columns is-multiline">
          {searchedCities.map((city) => {
            return (
              <div className="column is-4" key={city.cityId}>
                <div className="card">
                  {city.image ? (
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={city.image} alt={`The cover for ${city.name}`} />
                      </figure>
                    </div>
                  ) : null}
                  <div className="card-content">
                    <div className="mobile-view-div">
                      <div className="mobile-view">
                        <p className="title is-4">{city.name}</p>
                        <p className="subtitle is-6">{city.description}</p>
                      </div>
                    </div>
                    {Auth.loggedIn() && (
                      <button
                        disabled={savedCityIds?.some((savedCityId) => savedCityId === city.cityId)}
                        className='button is-fullwidth is-info'
                        onClick={(event) => handleSaveCity(city.name)} 
                        value={city.name}>
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
        <br></br>
        <br></br>
      </div>
    </>
  );
};
export default SearchCities;