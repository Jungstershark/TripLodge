// DateInput.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateInput from './dateInput';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { TextField, Box } from '@mui/material';

// Mock date picker component
jest.mock('@mui/x-date-pickers-pro/DateRangePicker', () => ({
  __esModule: true,
  DateRangePicker: ({ value, onChange, renderInput }) => {
    const [startDate, endDate] = value || [null, null];
    return (
      <div>
        {renderInput(
          { value: startDate || '', onChange: e => onChange([e.target.value, endDate]) },
          { value: endDate || '', onChange: e => onChange([startDate, e.target.value]) }
        )}
      </div>
    );
  }
}));

describe('DateInput Component', () => {
  test('renders DateInput component and its elements', () => {
    render(<DateInput dateRange={[null, null]} setDateRange={() => {}} />);

  
    expect(screen.getByRole('textbox', { name: /Check-in/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Check-out/i })).toBeInTheDocument();
    expect(screen.getByText('to')).toBeInTheDocument();
  });
  
  test('calls setDateRange with correct values on date change', () => {
    const mockSetDateRange = jest.fn();
    render(<DateInput dateRange={[null, null]} setDateRange={mockSetDateRange} />);

    // Simulate user input for the date picker
    fireEvent.change(screen.getByRole('textbox', { name: /Check-in/i }), { target: { value: '2024-08-01' } });
    fireEvent.change(screen.getByRole('textbox', { name: /Check-out/i }), { target: { value: '2024-08-15' } });

    // Check if setDateRange is called with the correct values
    expect(mockSetDateRange).toHaveBeenCalledWith(['2024-08-01', '2024-08-15']);
  });
});
