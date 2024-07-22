// src/searchBar/destinationSearch/destinationSearch.integration.test.js
import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DestinationSearch from './destinationSearch';
import destinations from './destinations.json';

// Mock the destinations data
jest.mock('./destinations.json', () => [
  { uid: 'jiHz', term: 'New York, NY, United States' },
  { uid: 'RsLO', term: 'Los Angeles, CA, United States' },
  { uid: 'lnS2', term: 'San Francisco, CA, United States' },
]);

// Mock the debounce function from lodash
jest.mock('lodash.debounce', () => jest.fn(fn => fn));

const TestWrapper = () => {
  const [query, setQuery] = useState('');

  return (
    <DestinationSearch query={query} setQuery={setQuery} />
  );
};

test('filters and displays suggestions based on input', async () => {
  render(<TestWrapper />);

  // Input the search term
  fireEvent.change(screen.getByPlaceholderText('Where to?'), { target: { value: 'New' } });

  // Wait for suggestions to appear
  await waitFor(() => {
    expect(screen.getByText('New York, NY, United States')).toBeInTheDocument();
    expect(screen.queryByText('Los Angeles, CA, United States')).not.toBeInTheDocument();
    expect(screen.queryByText('San Francisco, CA, United States')).not.toBeInTheDocument();
  });

  // Click on a suggestion
  fireEvent.click(screen.getByText('New York, NY, United States'));

  // Verify if the input field is updated with the selected suggestion
  expect(screen.getByPlaceholderText('Where to?').value).toBe('New York, NY, United States');
});
