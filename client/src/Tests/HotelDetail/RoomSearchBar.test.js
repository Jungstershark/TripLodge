import React from 'react';
import { render, screen } from '@testing-library/react';
import RoomSearchBar from '../../HotelDetail/RoomSearchBar';

describe('RoomSearchBar Component', () => {
  test('TC_RSB_001: Renders RoomSearchBar component', () => {
    render(<RoomSearchBar />);
    expect(screen.getByPlaceholderText(/No. of Guests?/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Check-out/i)).toBeInTheDocument();
  });
});
