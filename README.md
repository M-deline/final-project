# final-project
- Click [here](https://nomad-cities-5704d8a4d491.herokuapp.com/) to view deployed website!
## Table of Contents
- [Screenshots and Mobile View Video](#screenshots-and-mobile-view-video)
- [Description](#description)
- [Challenges & Successes](#challenges--successes)
- [Technologies Used](#technologies-used)
- [Future Development](#future-development)
- [Credits & Sources](#credits--sources)
- [Authors](#authors)
## Screenshots and Mobile View Video
<a name="screenshots-and-mobile-view-video"></a>
Click this [link](https://watch.screencastify.com/v/vDIVZfYsMKZ4OhCdSpyK) to view a video showing the desktop version and the mobile device version of our website.

- ![image of website showing the desktop homepage](./readme-images/Screenshot%202023-12-10%20at%205.52.50 PM.png)
- ![image of the website showing the card images of selected continents](./readme-images/Screenshot%202023-12-10%20at%205.52.57 PM.png)
- ![image of the website showing the login and signup page](./readme-images/Screenshot%202023-12-10%20at%205.53.04 PM.png)
- ![image of the website showing the saved cities page](./readme-images/Screenshot%202023-12-13%20at%205.09.57 PM.png)
## Process 
<a name="process"></a>
- We started this project by browsing RapidAPI and finding our API. We then created a user story and wireframe for anyone who likes to travel or for digital nomads looking for the next city they should go to. We used previous modules and challenges from the BootCamp to set up our file and folder structure and then we worked on getting the API to work and on getting the sign in and login routes to connect to the database. Once we got our website to start working, we worked on the save route and the CSS and design to make the map and the mobile version user friendly. 

## Description
<a name="description"></a>
- This is a full stack MERN application focusing on anyone who travels a lot and wants to be able to choose a continent and view a list of cities with an overall score that rates the cost of living, weather and internet access. The user is able to choose a continent and view cities, however, if they want to save a city they like, they must create an account. Then when they visit their saved cities page, they are able to view the cities or delete them as needed. This application uses the Nomad List Cities from Coinspot on RapidAPI.

## Challenges & Successes:
<a name="challenges--successes"></a>
- Our project was a success because we learned a lot about MERN apps and using GraphQL. The sign up and login forms work correctly and they connect to the database as well so that next time the user visits the site, they can log in to see their saved cities. 
- Another success and challenge was using JavaScript and CSS to make the website have two different layouts depending on the size of the screen. The React-Responsive npm package was used to do this, so that if the screen was smaller, like on a phone, then instead of seeing the map design, the user would be able to type the name of the continent they wanted to view. We did this because if we shrunk the map, it would be too small to see and to interact with, so we decided to have the user type the name of the continent instead for mobile devices. 
- We struggled with getting the app to deploy at first due to the package.json and we spent some time messing around with it before successfully deploying it. 
- We struggled with the save route and getting the saved cities to appear since we could see the id's showing up in the local storage. We fixed this by simplifying our query to have just the `{savedCities}` and not `{savedCities {cityId}}` so not having a requirement within the query. Our instructor, Dan helped immensely with this step. 

## Technologies Used:
<a name="technologies-used"></a>
- Node.js
- CSS
- Bulma 
- Mongoose / MongoDB
- JavaScript
- React
- Express
- GraphQL

## Future Development:
<a name="future-development"></a>
- In the future, we would like to have a donation page fully set up that allows users to contribute to the site and it would have a card payment option. 
- We would also like to implement more searching options and have the user be able to search by country, city, or continent.
- When the user saves a city or looks at a city, we would like to have a detailed description of the history or culture, population, and a picture of the city show up as well as the weather for user convenience.
- We would like the users to see the weather, cost of living, internet access, and overall score for each city when they view or when they save it instead of just the overall score. 
- We would also like to have user success stories as well so that new viewers can see how the app has helped others and be able to view other people's stories on how they are liking the city they choose.

## Credits & Sources: 
<a name="credits--sources"></a>
- Coinspot. “Nomad List Cities Api Documentation (EMIR12): Rapidapi.” RapidAPI, Mar. 2023, rapidapi.com/emir12/api/nomad-list-cities. 
- Coyier, Chris. “A Complete Guide to Flexbox: CSS-Tricks.” CSS, 9 Dec. 2022, css-tricks.com/snippets/css/a-guide-to-flexbox/. 
- Greve, Kaitlyn. “UseHistory =&gt; Usenavigate.” Medium, Medium, 19 July 2022, medium.com/@kgreve14/usehistory-usenavigate-5b383160adba#:~:text=With%20ReactRouter%20updating%20from%20version%205%20to%20version%206%2C%20there,using%20push%20or%20replace%20methods. 
- Ighalo, Jefferson. “Using REACT-Responsive to Implement Responsive Design.” LogRocket Blog, 5 Aug. 2021, blog.logrocket.com/using-react-responsive-to-implement-responsive-design/. 
- Meyer, Eric A, and Kathryn S Meyer. “Meyerweb.Com.” Meyerweb.Com, meyerweb.com/eric/tools/css/reset/. Accessed 8 Dec. 2023. 
- Previous Modules and Challenges from University of Denver BootCamp (specifically JWT, CSS, React, and GraphQL and previous challenges)
- “React-Responsive.” Npm, 2022, www.npmjs.com/package/react-responsive. 
- Shaver-Troup, Bonnie, et al. “Lexend.” Google Fonts, Google, fonts.google.com/specimen/Lexend. Accessed 5 Dec. 2023. 
- A big thank you to our Instructor Dan from University of Denver Bootcamp for helping us with this application, specifically the save feature. 
- Yocontra. “Yocontra/React-Responsive: CSS Media Queries in React - for Responsive Design, and More.” GitHub, 2020, github.com/yocontra/react-responsive. 

## Authors 
<a name="authors"></a>
- Amy: click [here](https://github.com/Akleynhans) to view her GitHub profile.
- Madeline: click [here](https://github.com/M-deline) to view her GitHub profile.



