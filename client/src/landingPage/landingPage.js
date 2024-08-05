import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '../pageHeader/pageHeader.js';
import SearchBar from '../searchBar/searchBar.js';
import './landingPage.css';

const LandingPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      const url = 'http://localhost:5005/search/destination/xmXl';
      const data = {
        checkin: '2024-10-01',
        checkout: '2024-10-07',
        lang: 'en_US',
        guests: 2,
        currency: 'SGD'
      };

      try {
        console.log('Fetching hotels...');
        const response = await axios.post(url, data);
        setHotels(response.data.slice(0, 6) || []); // Ensure only 6 hotels are set
        setLoading(false);
        console.log('Response data:', response.data[0]);
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Failed to load hotels.');
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const getRatingDescription = (rating) => {
    if (rating < 5) return 'Not Recommended';
    if (rating < 7) return 'Recommended';
    if (rating < 8) return 'Highly Recommended';
    return 'Excellent';
  };

  const convertRating = (rating) => (rating ? rating * 2 : 'No rating available');

  const getRatingClass = (ratingDescription) => {
    switch (ratingDescription) {
      case 'Not Recommended':
        return 'not-recommended';
      case 'Recommended':
        return 'recommended';
      case 'Highly Recommended':
        return 'highly-recommended';
      case 'Excellent':
        return 'excellent';
      default:
        return '';
    }
  };

  const handleClick = (hotelId) => {
    console.log('Hotel clicked:', hotelId);
    // Perform your action here (e.g., navigate to a new page)
    window.location.href = `/hotel/${hotelId}`;
  };

  if (loading) return <div className='Loading'>Loading...</div>;
  if (error) return <div className='Error'>{error}</div>;

  return (
    <div className='LandingPage'>
      <PageHeader />
      <h2>Your Perfect Stay, A Click Away!</h2>
      <SearchBar />
      <div className='TopDestination'>Top Destinations</div>
      <div className='Hotels'>
        {hotels.length === 0 ? (
          <div>No hotels found.</div>
        ) : (
          hotels.map((item, index) => {
            const imageSrc = `${process.env.PUBLIC_URL}/Hotel${index + 1}.jpg`;
            const rating = convertRating(item.hotel.rating);
            const ratingDescription = rating !== 'No rating available' ? getRatingDescription(rating) : rating;
            const ratingClass = getRatingClass(ratingDescription);

            return (
              <div onClick={() => handleClick(item.hotel.id)} key={index} className={`Hotel${index + 1}Container`}>
                <img className={`Hotel${index + 1}`} src={imageSrc} alt="Hotel" />
                <h3 className='hotelname'>{item.hotel.name || 'Hotel Name'}</h3>
                <div className={`rating ${ratingClass}`}>{rating}</div>
                <div className='ratingdescription'>{ratingDescription}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LandingPage;
