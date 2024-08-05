import React, { useState } from 'react';
import CustomDateRangePicker from '../searchBar/datePicker/datePicker.js';
import { format } from 'date-fns';
import './RoomSearchBar.css';

function RoomSearchBar() {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: dates.startDate,
    endDate: dates.endDate,
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
    setDates({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const formattedDate = `${format(selectionRange.startDate, 'EEE d MMM')} - ${selectionRange.endDate ? format(selectionRange.endDate, 'EEE d MMM') : 'Check-out'}`;

  return (
    <div className="Roomsearch-container">
      <div className="DateInput">
        <CustomDateRangePicker dates={dates} setDates={setDates} />
      </div>
      <input className="GuestInput" placeholder="No. of Guests?" />
    </div>
  );
}

export default RoomSearchBar;
