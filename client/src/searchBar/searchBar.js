import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch.js';
import DateInput from './dateInput';
//import TravellersInput from './TravellersInput';

function SearchBar() {
  const [dateRange, setDateRange] = useState([null, null]); 
  const [query, setQuery] = useState('');
  const [travellers, setTravellers] = useState('');

  return (
    <div className="search-container">
      <div className="search-bar">
        <DestinationSearch query={query} setQuery={setQuery} />
        <DateInput dateRange={dateRange} setDateRange={setDateRange} />
        {/*
        <TravellersInput travellers={travellers} setTravellers={setTravellers} />
        */}
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
