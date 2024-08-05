import React, { useState } from 'react';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch';
import DateRangePickerComponent from './datePicker/datePicker';
import GuestInput from './guestInput/guestInput';
import HotelList from '../hotelSearchPage/hotelList/hotelList';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [destinationId, setDestinationId] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = () => {
    if (destinationId && dates.startDate && dates.endDate) {
      setSearchParams({
        destinationId,
        checkin: dates.startDate.toISOString().split('T')[0],
        checkout: dates.endDate.toISOString().split('T')[0],
        lang: 'en',
        currency: 'USD',
        guests: `${guests.adults}|${guests.children}`,
      });
    }
  };

  return (
    <>
      <div className="search-container">
        <div className="search-bar">
          <DestinationSearch query={query} setQuery={setQuery} setDestinationId={setDestinationId} />
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
