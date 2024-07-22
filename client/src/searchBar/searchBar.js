import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch.js';
import DateInput from './dateInput';
import GuestInput from './guestInput';


function SearchBar() {
  const [dateRange, setDateRange] = useState([null, null]); 
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState('');

  return (
    <div className="search-container">
      <div className="search-bar">
        <DestinationSearch query={query} setQuery={setQuery} />
        <DateInput dateRange={dateRange} setDateRange={setDateRange} />
        <GuestInput guests={guests} setGuests={setGuests} />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
