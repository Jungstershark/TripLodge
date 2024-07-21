import React from 'react';
import './hotelList.css'

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <div className="hotel-image">Image</div>
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

const HotelList = ({ hotels }) => {
  return (
    <div className="hotel-list">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
