import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from '../destinationSearch/destinationSearch';
import DateInput from './dateInput';
//import TravellersInput from './TravellersInput';

function SearchBar() {
  const [startDate, setStartDate] = useState(null);
  const [query, setQuery] = useState('');
  const [travellers, setTravellers] = useState('');

  return (
    <div className="search-container">
      <div className="search-bar">
        <DestinationSearch query={query} setQuery={setQuery} />
        {/*
        <DateInput startDate={startDate} setStartDate={setStartDate} />
        <TravellersInput travellers={travellers} setTravellers={setTravellers} />
        */}
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
