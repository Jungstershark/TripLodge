// SearchBar.js
import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch.js';
// import CustomDateRangePicker from './datePicker/datePicker.js';
import GuestInput from './guestInput/guestInput.js';

function SearchBar() {
  // const [dateRange, setDateRange] = useState([null, null]);
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });

  return (
    <div className="search-container">
      <div className="search-bar">
        <DestinationSearch query={query} setQuery={setQuery} />
        {/* <CustomDateRangePicker /> */}
        <GuestInput guests={guests} setGuests={setGuests} />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchBar;
