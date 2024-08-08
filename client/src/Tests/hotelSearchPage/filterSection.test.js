import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterSection from '../../hotelSearchPage/filterSection/filterSection';

describe('FilterSection Component', () => {
  const mockOnPriceRangeChange = jest.fn();
  const mockOnStarRatingChange = jest.fn();
  const mockOnGuestRatingChange = jest.fn();

  const renderComponent = () =>
    render(
      <FilterSection
        onPriceRangeChange={mockOnPriceRangeChange}
        onStarRatingChange={mockOnStarRatingChange}
        onGuestRatingChange={mockOnGuestRatingChange}
      />
    );

  test('TC_FC_001: Check if "Filter By" heading is rendered', () => {
    renderComponent();
    expect(screen.getByText('Filter By')).toBeInTheDocument();
  });

  test('TC_FC_002: Check if "Total Price" label is rendered', () => {
    renderComponent();
    expect(screen.getByText('Total Price')).toBeInTheDocument();
  });

  test('TC_FC_003: Check if "Max" and "Min" input fields are rendered', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('$0')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('$900')).toBeInTheDocument();
  });

  test('TC_FC_004: Check if "Star Rating" label is rendered', () => {
    renderComponent();
    expect(screen.getByText('Star Rating')).toBeInTheDocument();
  });

  test('TC_FC_005: Check if star rating buttons (1 to 5) are rendered', () => {
    renderComponent();
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('TC_FC_006: Check if "Guest Rating" label is rendered', () => {
    renderComponent();
    expect(screen.getByText('Guest Rating')).toBeInTheDocument();
  });

  // test('TC_FC_007: Check if guest rating radio buttons are rendered', () => {
  //   renderComponent();
  //   const ratings = ['Any', 'Wonderful 9+', 'Very Good 8+', 'Good 7+'];
  //   ratings.forEach((rating) => {
  //     expect(screen.getByLabelText(rating)).toBeInTheDocument();
  //   });
  // });
});
