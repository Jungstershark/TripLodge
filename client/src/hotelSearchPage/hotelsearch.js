import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../pageHeader/pageHeader';
import SearchBar from '../searchBar/searchBar';
import FilterSection from './filterSection/filterSection.js';
import axios from 'axios';
import './hotelsearch.css';
import HotelCard from './hotelCard/hotelCard.js';

function HotelSearch() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [destinationId, setDestinationId] = useState(null);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState(null);
  const [page, setPage] = useState(1); // Page state
  const [hasMore, setHasMore] = useState(true); // State to track if more hotels are available

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
    setPage(1); // Reset page when new search is initiated
    setHotels([]); // Reset hotels list
    setHasMore(true); // Reset hasMore state
  };

  const fetchHotels = async (page) => {
    const queryParams = new URLSearchParams(location.search);
    const destinationId = queryParams.get('destinationId');
    const checkin = queryParams.get('checkin');
    const checkout = queryParams.get('checkout');
    const guests = queryParams.get('guests');

    setDestinationId(destinationId);
    setCheckin(checkin);
    setCheckout(checkout);
    setGuests(guests);

    try {
      const response = await axios.post(`http://localhost:5000/search/destination/${destinationId}`, {
        checkin,
        checkout,
        lang: 'en',
        currency: 'SGD',
        guests,
        page, // Send page parameter
        limit: 10 // Limit results to 10 per page
      });
      if (response.data.length < 10) {
        setHasMore(false); // If fewer than 10 results, no more data
      }
      setHotels(prevHotels => [...prevHotels, ...response.data]); // Append new results
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    if (location.search) {
      fetchHotels(page);
    }
  }, [location.search, page]); // Refetch when location.search or page changes

  const loadMoreHotels = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <PageHeader />
      <SearchBar onSearch={handleSearch} />
      <div className='hotellist-container'>
        <div className='filter-container'>
          <FilterSection setDestinationId={setDestinationId} />
        </div>
        <div className='hotels'>
          {hotels.map((item) => (
            <HotelCard key={item.id} hotel={item} hotelImage={`${item.hotel.imageDetails.prefix}1${item.hotel.imageDetails.suffix}`} />
          ))}
          {hasMore && (
            <Button onClick={loadMoreHotels} variant="contained" color="primary" sx={{ mt: 2 }}>
              Load More
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default HotelSearch;
