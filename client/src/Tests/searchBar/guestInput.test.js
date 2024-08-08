// GuestInput.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuestInput from '../../searchBar/guestInput/guestInput.js';

describe('GuestInput Component', () => {
  let guests, setGuests;

  beforeEach(() => {
    guests = { adults: 1, children: 0, rooms: 1 };
    setGuests = jest.fn(newGuests => {
      guests = { ...guests, ...newGuests };
    });

    render(<GuestInput guests={guests} setGuests={setGuests} />);
  });

  test('renders input field with default values', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    expect(inputField).toBeInTheDocument();
    expect(inputField).toHaveValue('1 adults · 0 children · 1 room');
  });

  test('opens dropdown on input field click', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    fireEvent.click(inputField);

    expect(screen.getByText('Adults')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Rooms')).toBeInTheDocument();
  });

  test('increments and decrements adults count', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    fireEvent.click(inputField);

    const incrementButton = screen.getAllByText('+')[0];
    const decrementButton = screen.getAllByText('-')[0];

    fireEvent.click(incrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, adults: 2 });

    fireEvent.click(decrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, adults: 1 });
  });

  test('increments and decrements children count', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    fireEvent.click(inputField);

    const incrementButton = screen.getAllByText('+')[1];
    const decrementButton = screen.getAllByText('-')[1];

    fireEvent.click(incrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, children: 1 });

    fireEvent.click(decrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, children: 0 });
  });

  test('increments and decrements rooms count', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    fireEvent.click(inputField);

    const incrementButton = screen.getAllByText('+')[2];
    const decrementButton = screen.getAllByText('-')[2];

    fireEvent.click(incrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, rooms: 2 });

    fireEvent.click(decrementButton);
    expect(setGuests).toHaveBeenCalledWith({ ...guests, rooms: 1 });
  });

  test('closes dropdown on Done button click', () => {
    const inputField = screen.getByPlaceholderText('No. of Guests?');
    fireEvent.click(inputField);

    const doneButton = screen.getByText('Done');
    fireEvent.click(doneButton);

    expect(screen.queryByText('Adults')).not.toBeInTheDocument();
    expect(screen.queryByText('Children')).not.toBeInTheDocument();
    expect(screen.queryByText('Rooms')).not.toBeInTheDocument();
  });
});

//passed
