import React, { useState } from 'react';
import PageHeader from '../pageHeader/pageHeader';
import SearchBar from '../searchBar/searchBar';
import FilterSection from './filterSection/filterSection.js';
import HotelList from './hotelList/hotelList';
import './hotelsearch.css';

function HotelSearch() {
  const [destinationId, setDestinationId] = useState(null);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = (queryParams) => {
    setCheckin(formatDate(queryParams.checkin));
    setCheckout(formatDate(queryParams.checkout));
    setGuests(`${queryParams.adults}|${queryParams.children}`);
  };

  return (
    <>
      <PageHeader />
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        <FilterSection setDestinationId={setDestinationId} />
        {destinationId && (
          <HotelList
            destinationId={destinationId}
            checkin={checkin}
            checkout={checkout}
            lang="en" // Assuming default language
            currency="USD" // Assuming default currency
            guests={guests}
          />
        )}
      </div>
    </>
  );
}

export default HotelSearch;
