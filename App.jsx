import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');

  const apiKey = 'bfa4c1992b163751b35399913923f64f'; // Replace with your actual API key

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError('');  // Clear any previous errors
    } catch (err) {
      // Set error message properly
      console(err);
      setError('City not found. Please try again.');
      setWeatherData(null);  // Clear weather data if the request fails
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);  // Re-fetch weather data whenever city changes

  return (
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar setCity={setCity} />
      {error && <div className="error">{error}</div>} {/* Show error if exists */}
      {weatherData ? (
        <WeatherCard data={weatherData} /> // Show weather data if available
      ) : (
        <div>Loading...</div>  // Show loading while data is being fetched
      )}
    </div>
  );
};

export default App;
