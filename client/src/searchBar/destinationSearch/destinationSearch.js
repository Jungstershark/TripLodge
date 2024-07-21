import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import destinations from '../destinations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './destinationSearch.css';

const DestinationSearch = ({ query, setQuery }) => {
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce the search input to improve performance
  const handleSearch = useCallback(
    debounce((searchTerm) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const results = destinations.filter(destination =>
        destination.term && destination.term.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredDestinations(results);
    }, 3000),
    []
  );

  // Update the query and trigger the search
  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    handleSearch(searchTerm);
    setShowSuggestions(searchTerm.length > 0);
  };

  // Ensure that the debounced search runs initially and whenever query changes
  useEffect(() => {
    handleSearch(query);
  }, [query, handleSearch]);

  // Handle suggestion click
  const handleSuggestionClick = (term) => {
    setQuery(term);
    setShowSuggestions(false);
  };

  return (
    <div className="input-icon-container">
      <FontAwesomeIcon icon={faLocationDot} className="input-icon" />
      <input
        type="text"
        placeholder="Where to?"
        className="input-field"
        value={query}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(query.length > 0)}
      />
      {showSuggestions && filteredDestinations.length > 0 && (
        <ul className="destination-list">
          {filteredDestinations.map((destination) => (
            <li
              key={destination.uid}
              className="destination-item"
              onClick={() => handleSuggestionClick(destination.term)}
            >
              {destination.term}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationSearch;
