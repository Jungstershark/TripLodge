// searchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchBar.css';
import DestinationSearch from './destinationSearch/destinationSearch';
import DateRangePickerComponent from './datePicker/datePicker';
import GuestInput from './guestInput/guestInput';
import SearchIcon from '@mui/icons-material/Search';

export const getGuestsCount = (guests) => {
  const totalGuests = guests.adults + guests.children;
  if (totalGuests === 1) {
    return '1';
  } else if (guests.rooms === 1) {
    return `${totalGuests}`;
  } else {
    return Array(guests.rooms).fill(totalGuests).join('|');
  }
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [destinationId, setDestinationId] = useState(null);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    if (destinationId && dates.startDate && dates.endDate) {
      const searchParams = new URLSearchParams({
        destinationId,
        checkin: dates.startDate.toISOString().split('T')[0],
        checkout: dates.endDate.toISOString().split('T')[0],
        lang: 'en',
        currency: 'SGD',
        guests: getGuestsCount(guests)
      }).toString();

      navigate(`/hotelSearch?${searchParams}`, {state: { numRooms: guests.rooms, numAdults: guests.adults, numChildren: guests.children }});
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <DestinationSearch query={query} setQuery={setQuery} setDestinationId={setDestinationId} />
        <DateRangePickerComponent dates={dates} setDates={setDates} />
        <GuestInput guests={guests} setGuests={setGuests} />
        <SearchIcon className="search-icon" fontSize='large' sx={{ color: '#FFFFFF', cursor: 'pointer' }} onClick={handleSearch} />
      </div>
    </div>
  );
};

export default SearchBar;
