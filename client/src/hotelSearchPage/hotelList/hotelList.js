import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hotelList.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-image">
        {hotel.imageDetails && hotel.imageDetails.url ? (
          <img src={hotel.imageDetails.url} alt={hotel.name} />
        ) : (
          "No Image Available"
        )}
      </div>
      <div className="hotel-info">
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>
      </div>
      <div className="hotel-actions">
        <button>Select</button>
      </div>
    </div>
  );
};

const HotelList = ({ destinationId, checkin, checkout, lang, currency, guests }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const loadHotels = async () => {
      setLoading(true); // Ensure loading state is true before fetching data
      try {
        console.log(`Fetching hotels with parameters:`, {
          destinationId,
          checkin,
          checkout,
          lang,
          currency,
          guests
        });
        
        

        // Fetch the list of hotels and their prices
        const response = await axios.post(`http://localhost:5000/search/destination/${destinationId}`, {
          checkin,
          checkout,
          lang,
          currency,
          guests
        });
        
        console.log('Response data:', response.data); // Log the response data

        // Set the hotels state with the fetched data
        setHotels(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setError('Error fetching hotels: ' + error.message);
      } finally {
        setLoading(false); // Ensure loading state is false after fetching data
      }
    };

    if (destinationId) {
      loadHotels();
    }
  }, [destinationId, checkin, checkout, lang, currency, guests]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hotels.length) {
    return <div>No hotels found.</div>; // Handle the case where no hotels are found
  }

  return (
    <div className="hotel-list">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
