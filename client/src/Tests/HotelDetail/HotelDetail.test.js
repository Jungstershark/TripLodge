import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HotelDetailPage from '../../HotelDetail/hotelDetailPage';
import UserContext from '../../contexts/UserContext';

describe('HotelDetailPage Component', () => {
  const renderComponent = (user = null) => {
    render(
      <UserContext.Provider value={{ user }}>
        <MemoryRouter initialEntries={['/hotel/123']}>
          <Routes>
            <Route path="/hotel/:id" element={<HotelDetailPage />} />
          </Routes>
        </MemoryRouter>
      </UserContext.Provider>
    );
  };

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  test('TC_HDP_001: Renders loading state', () => {
    renderComponent();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('TC_HDP_002: Renders error state when fetching fails', async () => {
    global.fetch.mockRejectedValue(new Error('Failed to fetch'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Failed to load hotel./i)).toBeInTheDocument();
    });
  });

  test('TC_HDP_003: Renders hotel details', async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        hotel: { name: 'Test Hotel', address: '123 Test St', description: '<p>Test description</p>', rating: 4.5 },
        rooms: [{ roomDescription: 'Deluxe Room', size: '30', bed: 'King', price: '100' }]
      })
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Test Hotel/i)).toBeInTheDocument();
      expect(screen.getByText(/Test description/i)).toBeInTheDocument();
      expect(screen.getByText(/123 Test St/i)).toBeInTheDocument();
      expect(screen.getByText(/Deluxe Room/i)).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
    });
  });

  test('TC_HDP_004: Handles room filtering', async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        hotel: { name: 'Test Hotel', address: '123 Test St', description: '<p>Test description</p>', rating: 4.5 },
        rooms: [
          { roomDescription: 'Deluxe Room', roomNormalizedDescription: 'Deluxe', size: '30', bed: 'King', price: '100' },
          { roomDescription: 'Executive Suite', roomNormalizedDescription: 'Executive Suite', size: '50', bed: 'King', price: '200' }
        ]
      })
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Deluxe Room/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Executive Suite/i)).toHaveLength(2);
    });

    fireEvent.click(screen.getAllByRole('button', { name: /Executive Suite/i })[0]); // Click the filter button
    expect(screen.queryByText(/Deluxe Room/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Executive Suite/i)[1]).toBeInTheDocument(); // Ensure it's the room description
  });

  test('TC_HDP_005: Handles show more/less description', async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        hotel: { name: 'Test Hotel', address: '123 Test St', description: '<p>Test description</p><p>More description</p>', rating: 4.5 },
        rooms: [{ roomDescription: 'Deluxe Room', size: '30', bed: 'King', price: '100' }]
      })
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Test description/i)).toBeInTheDocument();
      expect(screen.queryByText(/More description/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Show More.../i));
    expect(screen.getByText(/More description/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Show Less.../i));
    expect(screen.queryByText(/More description/i)).not.toBeInTheDocument();
  });
});
