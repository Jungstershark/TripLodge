import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import SearchBar, { formatGuests } from '../../searchBar/searchBar';

describe('SearchBar Component', () => {
  // it('renders the search bar components correctly', () => {
  //   render(
  //     <MemoryRouter>
  //       <SearchBar />
  //     </MemoryRouter>
  //   );

  //   // expect(screen.getByPlaceholderText('Search destinations')).toBeInTheDocument();
  //   // const today = new Date().toISOString().split('T')[0];
  //   // expect(screen.getByPlaceholderText(today)).toBeInTheDocument();
  //   // expect(screen.getByPlaceholderText('Check-out')).toBeInTheDocument();
  //   expect(screen.getByLabelText('Guests')).toBeInTheDocument();
  //   // expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  // });

  it('formats guests correctly', () => {
    expect(formatGuests({ adults: 1, children: 0, rooms: 1 })).toBe('1');
    expect(formatGuests({ adults: 2, children: 1, rooms: 1 })).toBe('3');
    expect(formatGuests({ adults: 2, children: 2, rooms: 2 })).toBe('4|4');
  });
});

// describe('SearchBar Integration', () => {
//   it('renders the search bar with today\'s date as the placeholder for the start date', () => {
//     const today = new Date().toISOString().split('T')[0];
//     render(
//       <MemoryRouter>
//         <SearchBar />
//       </MemoryRouter>
//     );

//     const startDateInput = screen.getByPlaceholderText(today);
//     expect(startDateInput).toBeInTheDocument();
//   });

//   it('navigates to the correct URL on search', () => {
//     const history = createMemoryHistory();
//     render(
//       <Router history={history}>
//         <SearchBar />
//       </Router>
//     );

//     const today = new Date().toISOString().split('T')[0];

//     // Simulate user interactions
//     fireEvent.change(screen.getByPlaceholderText('Search destinations'), { target: { value: 'Singapore' } });
//     fireEvent.change(screen.getByPlaceholderText('Check-out'), { target: { value: '2024-08-08' } });
//     fireEvent.change(screen.getByLabelText('Guests'), { target: { value: '2' } });
//     fireEvent.click(screen.getByTestId('search-icon'));

//     // Ensure correct navigation with today's date as check-in
//     expect(history.location.pathname).toBe('/hotelSearch');
//     expect(history.location.search).toContain(`checkin=${today}`);
//     expect(history.location.search).toContain('checkout=2024-08-08');
//     expect(history.location.search).toContain('guests=2');
//   });
// });
