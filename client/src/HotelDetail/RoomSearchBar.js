import React, { useState } from 'react';
import CustomDateRangePicker from '../searchBar/datePicker/datePicker.js';
import './RoomSearchBar.css'


function RoomSearchBar() {
    const [dateRange, setDateRange] = useState([null, null]); 
  
    return (
      <div className="Roomsearch-container">
        <div className="DateInput">
          <CustomDateRangePicker />
        </div>
            <input className="GuestInput" placeholder='No. of Guests?'></input>

      </div>
    );
  }
  
  export default RoomSearchBar;
  