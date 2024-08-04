import React, { useState } from 'react';
import './guestInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const GuestInput = ({ guests, setGuests }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAdultsChange = (amount) => {
    setGuests({ ...guests, adults: Math.max(1, guests.adults + amount) });
  };

  const handleChildrenChange = (amount) => {
    setGuests({ ...guests, children: Math.max(0, guests.children + amount) });
  };

  const handleRoomsChange = (amount) => {
    setGuests({ ...guests, rooms: Math.max(1, guests.rooms + amount) });
  };

  return (
    <div className="input-icon-container" onClick={() => setShowDropdown(!showDropdown)}>
      <FontAwesomeIcon icon={faUser} className="input-icon" />
      <input
        type="text"
        placeholder="No. of Guests?"
        className="input-field"
        readOnly
        value={`${guests.adults} adults · ${guests.children} children · ${guests.rooms} room${guests.rooms > 1 ? 's' : ''}`}
      />
      {showDropdown && (
        <div className="guest-dropdown">
          <div className="guest-option">
            <span>Adults</span>
            <div className="guest-counter">
              <button onClick={() => handleAdultsChange(-1)}>-</button>
              <span>{guests.adults}</span>
              <button onClick={() => handleAdultsChange(1)}>+</button>
            </div>
          </div>
          <div className="guest-option">
            <span>Children</span>
            <div className="guest-counter">
              <button onClick={() => handleChildrenChange(-1)}>-</button>
              <span>{guests.children}</span>
              <button onClick={() => handleChildrenChange(1)}>+</button>
            </div>
          </div>
          <div className="guest-option">
            <span>Rooms</span>
            <div className="guest-counter">
              <button onClick={() => handleRoomsChange(-1)}>-</button>
              <span>{guests.rooms}</span>
              <button onClick={() => handleRoomsChange(1)}>+</button>
            </div>
          </div>
          <button className="done-button" onClick={() => setShowDropdown(false)}>Done</button>
        </div>
      )}
    </div>
  );
};

export default GuestInput;
