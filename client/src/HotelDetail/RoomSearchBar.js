import React, { useState } from 'react';
import DateInput from '../searchBar/dateInput';
import './RoomSearchBar.css'


function RoomSearchBar() {
    const [dateRange, setDateRange] = useState([null, null]); 
  
    return (
      <div className="Roomsearch-container">
        <div className="DateInput">
          <DateInput  dateRange={dateRange} setDateRange={setDateRange} />
        </div>
            <input className="GuestInput" placeholder='No. of Guests?'></input>

      </div>
    );
  }
  
  export default RoomSearchBar;
  