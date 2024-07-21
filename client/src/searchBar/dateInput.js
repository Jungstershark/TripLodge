import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, Box } from '@mui/material';
import './dateInput.css';


function DateInput({ dateRange, setDateRange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        startText="Check-in"
        endText="Check-out"
        value={dateRange}
        onChange={(newValue) => setDateRange(newValue)}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} className="date-picker-input" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} className="date-picker-input" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
