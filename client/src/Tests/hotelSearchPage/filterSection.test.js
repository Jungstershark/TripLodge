import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterSection from '../../hotelSearch/filterSection/filterSection.js';

describe('FilterSection component', () => {
  const mockOnPriceRangeChange = jest.fn();
  const mockOnStarRatingChange = jest.fn();
  const mockOnGuestRatingChange = jest.fn();

  beforeEach(() => {
    render(
      <FilterSection 
        onPriceRangeChange={mockOnPriceRangeChange}
        onStarRatingChange={mockOnStarRatingChange}
        onGuestRatingChange={mockOnGuestRatingChange}
      />
    );
  });

  test('should render the filter section', () => {
    expect(screen.getByText(/filter by/i)).toBeInTheDocument();
  });

  test('should change price range using slider', () => {
    const priceSlider = screen.getByRole('slider');
    fireEvent.change(priceSlider, { target: { value: [100, 800] } });
    expect(mockOnPriceRangeChange).toHaveBeenCalledWith([100, 800]);
  });

  test('should change min price using input', () => {
    const minPriceInput = screen.getByPlaceholderText('$0');
    fireEvent.change(minPriceInput, { target: { value: '100' } });
    expect(mockOnPriceRangeChange).toHaveBeenCalledWith([100, 900]);
  });

  test('should change max price using input', () => {
    const maxPriceInput = screen.getByPlaceholderText('$900');
    fireEvent.change(maxPriceInput, { target: { value: '800' } });
    expect(mockOnPriceRangeChange).toHaveBeenCalledWith([0, 800]);
  });

  test('should change star rating', () => {
    const starButton = screen.getByText('4★');
    fireEvent.click(starButton);
    expect(mockOnStarRatingChange).toHaveBeenCalledWith(4);
  });

  // test('TC_FC_007: Check if guest rating radio buttons are rendered', () => {
  //   renderComponent();
  //   const ratings = ['Any', 'Wonderful 9+', 'Very Good 8+', 'Good 7+'];
  //   ratings.forEach((rating) => {
  //     expect(screen.getByLabelText(rating)).toBeInTheDocument();
  //   });
  // });
});
