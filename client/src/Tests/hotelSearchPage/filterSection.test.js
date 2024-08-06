// /Tests/hotelSearchPage/filterSection.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSection from '../../hotelSearchPage/filterSection/filterSection';

describe('FilterSection Component', () => {
  test('TC_FC_001: Check if "Filter By" heading is rendered', () => {
    render(<FilterSection />);
    expect(screen.getByText('Filter By')).toBeInTheDocument();
  });

  test('TC_FC_002: Check if "Total Price" label is rendered', () => {
    render(<FilterSection />);
    expect(screen.getByText('Total Price')).toBeInTheDocument();
  });

  test('TC_FC_003: Check if "Max" and "Min" input fields are rendered', () => {
    render(<FilterSection />);
    const inputs = screen.getAllByPlaceholderText('0');
    expect(inputs).toHaveLength(2);
  });

  test('TC_FC_004: Check if "Star Rating" label is rendered', () => {
    render(<FilterSection />);
    expect(screen.getByText('Star Rating')).toBeInTheDocument();
  });

  test('TC_FC_005: Check if star rating buttons (1 to 5) are rendered', () => {
    render(<FilterSection />);
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  test('TC_FC_006: Check if "Guest Rating" label is rendered', () => {
    render(<FilterSection />);
    expect(screen.getByText('Guest Rating')).toBeInTheDocument();
  });

  test('TC_FC_007: Check if guest rating radio buttons are rendered', () => {
    render(<FilterSection />);
    const ratings = ['Any', 'Wonderful 9+', 'Very Good 8+', 'Good 7+'];
    ratings.forEach(rating => {
      expect(screen.getByLabelText(rating)).toBeInTheDocument();
    });
  });

  test('TC_FC_008: Check if the correct guest rating radio button is selected', () => {
    render(<FilterSection />);
    const anyRating = screen.getByLabelText('Any');
    const wonderfulRating = screen.getByLabelText('Wonderful 9+');
    fireEvent.click(anyRating);
    expect(anyRating).toBeChecked();
    fireEvent.click(wonderfulRating);
    expect(wonderfulRating).toBeChecked();
  });
});
