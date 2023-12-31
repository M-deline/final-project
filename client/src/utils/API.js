// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save city data for a logged in user
export const saveCity = (cityData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cityData),
  });
};

// remove saved city data for a logged in user
export const deleteCity = (cityId, token) => {
  return fetch(`/api/users/cities/${cityId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};



export const searchNomadCities = async (query) => {
  const url = `https://nomad-list-cities.p.rapidapi.com/nomad-list/${query}?size=20&page=1&sort=desc&sort_by=overall_score`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '6e82ef3af3mshd6558fca7054e98p1edac1jsn0daaf7085f65',
      'X-RapidAPI-Host': 'nomad-list-cities.p.rapidapi.com'
    }
  };
  

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Fetch request failed');
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

