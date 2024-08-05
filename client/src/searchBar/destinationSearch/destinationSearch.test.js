import React, { useState, useEffect } from 'react';
import destinations from './destinations.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './destinationSearch.css';

const DestinationSearch = ({ query, setQuery, setDestinationId }) => {
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query) {
      const filtered = destinations.filter(destination =>
        destination.term && destination.term.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations([]);
    }
    setShowSuggestions(query.length > 0);
  }, [query]);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSuggestionClick = (destination) => {
    setQuery(destination.term);
    setDestinationId(destination.uid);
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
          {filteredDestinations.map((destination, index) => (
            <li
              key={`${destination.uid}-${index}`}
              className="destination-item"
              onClick={() => handleSuggestionClick(destination)}
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
