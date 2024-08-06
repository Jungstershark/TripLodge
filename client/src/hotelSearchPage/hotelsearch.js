import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../pageHeader/pageHeader';
import SearchBar from '../searchBar/searchBar';
import FilterSection from './filterSection/filterSection.js';
import axios from 'axios';
import './hotelsearch.css';
import HotelCard from './hotelCard/hotelCard.js';
import { CircularProgress, Box } from '@mui/material';

function HotelSearch() {
  const location = useLocation();
  const [hotels, setHotels] = useState([]);
  const [destinationId, setDestinationId] = useState(null);
  const [checkin, setCheckin] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [guests, setGuests] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

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
      setLoading(true);
      console.log(`Fetching hotels for page ${page}`);
      const response = await axios.post(`http://localhost:5000/search/destination/${destinationId}`, {
        checkin,
        checkout,
        lang: 'en',
        currency: 'SGD',
        guests,
        page,
        limit: 10
      });
      console.log(`Received ${response.data.length} hotels`);
      if (response.data.length < 10) {
        setHasMore(false);
      }
      setHotels(prevHotels => [...prevHotels, ...response.data]);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHotels([]);
    setPage(1);
    if (location.search) {
      fetchHotels(1);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScrollForFilter = () => {
      const filterContainer = document.querySelector('.filter-container');
      if (filterContainer) {
        if (window.scrollY > 100) {
          filterContainer.classList.add('bounce');
        } else {
          filterContainer.classList.remove('bounce');
        }
      }
    };

    window.addEventListener('scroll', handleScrollForFilter);

    return () => {
      window.removeEventListener('scroll', handleScrollForFilter);
    };
  }, []);

  useEffect(() => {
    const handleScrollForLoadMore = (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        console.log('Loading more hotels...');
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observerInstance = new IntersectionObserver(handleScrollForLoadMore, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    if (observer.current) {
      observerInstance.observe(observer.current);
    }

    return () => {
      if (observer.current) {
        observerInstance.unobserve(observer.current);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (page > 1) {
      fetchHotels(page);
    }
  }, [page]); // Fetch hotels when page changes

  return (
    <>
      <PageHeader />
      <SearchBar />
      <div className='hotellist-container'>
        <div className='filter-container'>
          <FilterSection setDestinationId={setDestinationId} />
        </div>
        <div className='hotels'>
          {hotels.map((item) => (
            <HotelCard key={item.id} hotel={item} hotelImage={`${item.hotel.imageDetails.prefix}1${item.hotel.imageDetails.suffix}`} />
          ))}
          <div ref={observer} style={{ height: '1px', background: 'transparent' }}></div>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2, maxWidth: 850 }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </>
  );
}

export default HotelSearch;
