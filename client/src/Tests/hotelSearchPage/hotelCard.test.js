import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelCard from '../../hotelSearchPage/hotelCard/hotelCard';
import { MemoryRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

describe('HotelCard Component', () => {
  const hotel = {
    hotel: {
      name: 'Hotel Example',
      rating: 4,
      address: '123 Main St, Anytown, USA',
    },
    price: 150,
  };
  const hotelImage = '/path/to/image.jpg';

  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <HotelCard hotel={hotel} hotelImage={hotelImage} />
        </MemoryRouter>
      </ThemeProvider>
    );

  test('TC_HC_001: Renders HotelCard component', () => {
    renderComponent();
    expect(screen.getByText('Hotel Example')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Hotel Example/i })).toBeInTheDocument();
  });

  test('TC_HC_002: Displays hotel name correctly', () => {
    renderComponent();
    expect(screen.getByText('Hotel Example')).toBeInTheDocument();
  });

  test('TC_HC_003: Displays hotel address correctly', () => {
    renderComponent();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
  });

  test('TC_HC_004: Displays hotel price correctly', () => {
    renderComponent();
    expect(screen.getByText('$150')).toBeInTheDocument();
  });

  test('TC_HC_005: Displays hotel image correctly', () => {
    renderComponent();
    const img = screen.getByRole('img', { name: /Hotel Example/i });
    expect(img).toHaveAttribute('src', hotelImage);
  });

  test('TC_HC_006: Displays check availability button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Check availability/i })).toBeInTheDocument();
  });

  test('TC_HC_007: Displays hotel rating correctly', () => {
    renderComponent();
    expect(screen.getByLabelText('4 Stars')).toBeInTheDocument();
  });
});
