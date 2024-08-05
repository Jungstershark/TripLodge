// SearchBar.js
import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch.js';
import DateRangePickerComponent from './datePicker/datePicker.js';
import GuestInput from './guestInput/guestInput.js';
import HotelList from '../hotelSearchPage/hotelList/hotelList.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = () => {
    if (query && dates.startDate && dates.endDate) {
      setSearchParams({
        destinationId: query,
        checkin: dates.startDate.toISOString().split('T')[0],
        checkout: dates.endDate.toISOString().split('T')[0],
        lang: 'en',
        currency: 'USD',
        guests: guests.adults + guests.children,
      });
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <DestinationSearch query={query} setQuery={setQuery} />
          <DateRangePickerComponent dates={dates} setDates={setDates} />
          <GuestInput guests={guests} setGuests={setGuests} />
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="container">
        {searchParams && (
          <HotelList {...searchParams} />
        )}
      </div>
    </>
  );
};

export default SearchBar;
