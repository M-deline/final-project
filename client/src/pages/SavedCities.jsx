import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_CITY } from "../utils/mutations";
import Auth from '../utils/auth';
import { removeCityId } from '../utils/localStorage';

const SavedCities = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeCity] = useMutation(REMOVE_CITY);

  const userData = data?.me || {};

  const handleDeleteCity = async (cityId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeCity({
        variables: { cityId },
      });
      removeCityId(cityId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <div className="container">
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Viewing saved cities!</h1>
          </div>
        </div>
      </section>
      <div className="container">
        <h2 className='pt-5'>
          {userData.savedCities.length
            ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'}:`
            : 'You have no saved cities!'}
        </h2>
        <div className="columns is-multiline">
          {userData.savedCities.map((city) => {
            return (
              <div className="column is-one-third" key={city.cityId}>
                <div className="card">
                  {city.image ? <div className="card-image"><figure className="image is-4by3"><img src={city.image} alt={`The cover for `} /></figure></div> : null}
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{city.name}</p>
                      </div>
                    </div>
                    <div className="content">{city.description}</div>
                  </div>
                  <footer className="card-footer">
                    <a href="#" className="card-footer-item has-text-danger" onClick={() => handleDeleteCity(city.cityId)}>Delete this City!</a>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedCities;