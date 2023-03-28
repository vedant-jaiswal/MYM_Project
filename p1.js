// Creating a SPA that fetches data from NASA and displays a new image every day:
// You will need to obtain an API key from NASA's API portal.
// Use a front-end framework like React or Vue to create a single-page application that fetches the NASA API data.
// Make an HTTP request to the NASA API endpoint using a library like Axios or Fetch.
// Parse the API response and display the image on the webpage.

import React, { useState, useEffect } from "react";
import axios from "axios";

function NasaImage() {
  const [nasaData, setNasaData] = useState({});

  useEffect(() => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=YOUR_API_KEY_HERE`)
      .then(res => {
        setNasaData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>{nasaData.title}</h2>
      <img src={nasaData.url} alt={nasaData.title} />
      <p>{nasaData.explanation}</p>
    </div>
  );
}

export default NasaImage;
