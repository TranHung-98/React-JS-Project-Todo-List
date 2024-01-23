// Thêm các thư viện cần thiết
import React, { useState, useEffect } from 'react';

const Covid19App = () => {
  const [globalStats, setGlobalStats] = useState({});
  const [vietnamStats, setVietnamStats] = useState({});

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const response = await fetch('https://corona.lmao.ninja/v3/covid-19/all');
        const data = await response.json();
        setGlobalStats(data);
      } catch (error) {
        console.error('Error fetching global COVID-19 data', error);
      }
    };

    const fetchVietnamStats = async () => {
      try {
        const response = await fetch('https://corona.lmao.ninja/v3/covid-19/countries/Vietnam');
        const data = await response.json();
        setVietnamStats(data);
      } catch (error) {
        console.error('Error fetching Vietnam COVID-19 data', error);
      }
    };

    fetchGlobalStats();
    fetchVietnamStats();
  }, []);

  return (
    <div>
      <h1>COVID-19 Tracker</h1>
      <div>
        <h2>Global Stats</h2>
        <p>Total Cases: {globalStats.cases}</p>
        {/* Add more global stats as needed */}
      </div>
      <div>
        <h2>Vietnam Stats</h2>
        <p>Total Cases: {vietnamStats.cases}</p>
        {/* Add more Vietnam stats as needed */}
      </div>
    </div>
  );
};

export default Covid19App;
