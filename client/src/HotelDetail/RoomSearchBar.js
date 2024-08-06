import React, { useState } from 'react';
import DateRangePickerComponent from '../searchBar/datePicker/datePicker.js';
import GuestInput from '../searchBar/guestInput/guestInput.js';
import { format } from 'date-fns';
import './RoomSearchBar.css';

function RoomSearchBar() {
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const formatGuests = (guests) => {
    const { adults, children, rooms } = guests;
    const totalGuests = adults + children;

    if (rooms === 1) {
      return `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`;
    } else {
      return `${rooms} Room${rooms > 1 ? 's' : ''} (${totalGuests} Guest${totalGuests > 1 ? 's' : ''})`;
    }
  };

  const handleSearch = () => {
    // Placeholder destinationId; you might get this from props or state
    const destinationId = 'example-destination-id'; 

    if (destinationId && dates.startDate && dates.endDate) {
      const searchParams = new URLSearchParams({
        destinationId,
        checkin: dates.startDate.toISOString().split('T')[0],
        checkout: dates.endDate.toISOString().split('T')[0],
        lang: 'en',
        currency: 'SGD',
        guests: formatGuests(guests),
      }).toString();

      // Redirect or perform search with searchParams
      console.log('Search Parameters:', searchParams);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const formattedDate = `${format(dates.startDate, 'EEE d MMM')} - ${dates.endDate ? format(dates.endDate, 'EEE d MMM') : 'Check-out'}`;

  return (
    <div className="Roomsearch-container">
      <div className="DateInput">
        <DateRangePickerComponent dates={dates} setDates={setDates} />
      </div>
      <div className="GuestInput">
        <GuestInput guests={guests} setGuests={setGuests} />
      </div>
      <button className="SearchButton" onClick={handleSearch}>Search</button>
    </div>
  );
}

export default RoomSearchBar;
