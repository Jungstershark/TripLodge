import React from 'react';



function GuestInput({ guests, setGuests }) {
  return (
    <div className="input-icon-container">
        <input 
        type="text" 
        placeholder="No. of Guests?" 
        className="input-field">
        </input>
    </div>
  );
}

export default GuestInput;
