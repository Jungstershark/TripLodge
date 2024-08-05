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
        currency: 'SGD',
        guests: 2
      };

      try {
        console.log('Fetching hotels...');
        const response = await axios.post(url, data);
        setHotels(response.data || []);
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
            // Construct the image URL
            const imageUrl = item.hotel.imageDetails
              ? `${item.hotel.imageDetails.prefix}${item.hotel.id}${item.hotel.imageDetails.suffix}`
              : 'defaultImage.jpg';

            return (
              <div key={index} className={`Hotel${index}Container`}>
                <img className="greentick" src={process.env.PUBLIC_URL + "../Hotel1.jpg"} alt="Error displaying logo"></img>
                <h3>{item.hotel.name || 'Hotel Name'}</h3>
                <div>{item.hotel.rating || 'No rating available'}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LandingPage;
