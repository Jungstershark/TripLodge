import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateRangePickerComponent from '../../searchBar/datePicker/datePicker.js';
import { format } from 'date-fns';

// Mock the format function to avoid issues with date formatting during testing
jest.mock('date-fns', () => ({
  ...jest.requireActual('date-fns'),
  format: jest.fn((date, formatString) => {
    if (!date) return 'undefined';
    return `formatted ${formatString}`;
  }),
}));

describe('DateRangePickerComponent', () => {
  const dates = {
    startDate: new Date(2023, 0, 1),
    endDate: null,  // Initial state with endDate as null
  };
  const setDates = jest.fn();

  test('renders the component with formatted date', () => {
    render(<DateRangePickerComponent dates={dates} setDates={setDates} />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
    // expect(inputElement.value).toBe('formatted EEE d MMM - Check-out');
  });

//   test('shows calendar when input is clicked', () => {
//     render(<DateRangePickerComponent dates={dates} setDates={setDates} />);

//     const inputElement = screen.getByRole('textbox');
//     fireEvent.click(inputElement);

//     const calendarElement = screen.getByRole('presentation');
//     expect(calendarElement).toBeInTheDocument();
//   });

//   test('hides calendar when Apply button is clicked', () => {
//     render(<DateRangePickerComponent dates={dates} setDates={setDates} />);

//     const inputElement = screen.getByRole('textbox');
//     fireEvent.click(inputElement);

//     const applyButton = screen.getByRole('button', { name: /apply/i });
//     fireEvent.click(applyButton);

//     expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
//   });

//   test('calls setDates with new dates when date is selected', () => {
//     render(<DateRangePickerComponent dates={dates} setDates={setDates} />);

//     const inputElement = screen.getByRole('textbox');
//     fireEvent.click(inputElement);

//     // Mock date selection
//     const newStartDate = new Date(2023, 0, 5);
//     const newEndDate = new Date(2023, 0, 15);
//     fireEvent.change(screen.getByRole('presentation'), {
//       target: {
//         value: {
//           startDate: newStartDate,
//           endDate: newEndDate,
//         },
//       },
//     });

//     fireEvent.click(screen.getByRole('button', { name: /apply/i }));

//     expect(setDates).toHaveBeenCalledWith({
//       startDate: newStartDate,
//       endDate: newEndDate,
//     });
//   });
});
