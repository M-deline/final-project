import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_USER } from "../utils/queries";
import { REMOVE_CITY } from "../utils/mutations";
import Auth from '../utils/auth';
import { removeCityId } from '../utils/localStorage';
import { Navigate, useParams } from 'react-router-dom';


const SavedCities = () => {
  const [removeCity] = useMutation(REMOVE_CITY);
  // const { userId } = useParams();
  // Use React Router's `<Redirect />` component to redirect to personal user page if username is yours
  const userId = (Auth.loggedIn() && Auth.getProfile().data._id) ? Auth.getProfile().data._id : null;
  


  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : GET_ME,
    {
      variables: { userId },
    }
  );

  


  
  
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_user` query
  const user = data?.user || {};
  
  const handleDeleteCity = async (cityId) => {
    try {
      const { data } = await removeCity({
        variables: { cityId, userId},
      });
    } catch (err) {
      console.error(err);
    }
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
        {/* <h2 className='pt-5'>
          {userData.savedCities.length
            ? `Viewing ${userData.savedCities.length} saved ${userData.savedCities.length === 1 ? 'city' : 'cities'}:`
            : 'You have no saved cities!'}
        </h2> */}
        <div className="columns is-multiline">
          {user.savedCities.map((city) => {
            return (
              <div className="column is-one-third" key={city}>
                <div className="card">
                  {city.image ? <div className="card-image"><figure className="image is-4by3"><img src={city} alt={`The cover for `} /></figure></div> : null}
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{city}</p>
                      </div>
                    </div>
                    <div className="content">{city}</div>
                  </div>
                  <footer className="card-footer">
                    <a href="#" className="card-footer-item has-text-danger" onClick={() => handleDeleteCity(city)}>Delete this City!</a>
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