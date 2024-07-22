import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSection from './filterSection';

describe('FilterSection Component', () => {
  test('renders Filter By heading', () => {
    render(<FilterSection />);
    expect(screen.getByText('Filter By')).toBeInTheDocument();
  });

  test('renders Total Price label', () => {
    render(<FilterSection />);
    expect(screen.getByText('Total Price')).toBeInTheDocument();
  });

  test('renders Max and Min input fields', () => {
    render(<FilterSection />);
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
  });
  
  test('renders Star Rating label', () => {
    render(<FilterSection />);
    expect(screen.getByText('Star Rating')).toBeInTheDocument();
  });

  test('renders star rating buttons', () => {
    render(<FilterSection />);
    [1, 2, 3, 4, 5].forEach(star => {
      expect(screen.getByText(star)).toBeInTheDocument();
    });
  });

  test('renders Guest Rating label', () => {
    render(<FilterSection />);
    expect(screen.getByText('Guest Rating')).toBeInTheDocument();
  });

  test('renders guest rating radio buttons', () => {
    render(<FilterSection />);
    ['Any', 'Wonderful 9+', 'Very Good 8+', 'Good 7+'].forEach(rating => {
      expect(screen.getByLabelText(rating)).toBeInTheDocument();
    });
  });

  test('selects the correct guest rating radio button', () => {
    render(<FilterSection />);
    const anyRadioButton = screen.getByLabelText('Any');
    fireEvent.click(anyRadioButton);
    expect(anyRadioButton).toBeChecked();

    const wonderfulRadioButton = screen.getByLabelText('Wonderful 9+');
    fireEvent.click(wonderfulRadioButton);
    expect(wonderfulRadioButton).toBeChecked();
  });
});
