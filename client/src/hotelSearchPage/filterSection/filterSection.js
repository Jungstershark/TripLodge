import React, { useRef, useState } from 'react';
import './filterSection.css';
import PriceRangeSlider from './priceRangeSlider';

const FilterSection = () => {
  const maxInputRef = useRef(null);
  const minInputRef = useRef(null);

  const [priceRange, setPriceRange] = useState([0, 900]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleMinInputChange = (e) => {
    const newMin = Math.min(Math.max(0, Number(e.target.value)), priceRange[1]);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxInputChange = (e) => {
    const newMax = Math.max(Math.min(1000, Number(e.target.value)), priceRange[0]);
    setPriceRange([priceRange[0], newMax]);
  };

  const focusInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="filter-section">
      <h3>Filter By</h3>
      <div className="filter-price">
        <label>Total Price</label>
        <PriceRangeSlider value={priceRange} onChange={handleSliderChange} />
        <div className="price-input" onClick={() => focusInput(minInputRef)}>
          <span>Min</span>
          <input
            id="min"
            type="number"
            placeholder="$0"
            ref={minInputRef}
            value={priceRange[0]}
            onChange={handleMinInputChange}
          />
        </div>
        <div className="price-range">
          <div className="price-input" onClick={() => focusInput(maxInputRef)}>
            <span>Max</span>
            <input
              id="max"
              type="number"
              placeholder="$900"
              ref={maxInputRef}
              value={priceRange[1]}
              onChange={handleMaxInputChange}
            />
          </div>
        </div>
      </div>
      <div className="filter-star-rating">
        <label>Star Rating</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map(star => (
            <button key={star}>
              {star}
              <span>★</span>
            </button>
          ))}
        </div>
      </div>
      <div className="filter-guest-rating">
        <label>Guest Rating</label>
        <div className="guest-rating">
          <label><input type="radio" name="guest-rating" value="any" /> Any</label>
          <label><input type="radio" name="guest-rating" value="9+" /> Wonderful 9+</label>
          <label><input type="radio" name="guest-rating" value="8+" /> Very Good 8+</label>
          <label><input type="radio" name="guest-rating" value="7+" /> Good 7+</label>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
