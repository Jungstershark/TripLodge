import React, { useRef } from 'react';
import './filterSection.css';
import PriceRangeSlider from './priceRangeSlider';

const FilterSection = () => {
  const maxInputRef = useRef(null);
  const minInputRef = useRef(null);

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
        <PriceRangeSlider />
        {/* <input className="priceRangeBar" type="range" min="0" max="200" /> */}
        <div className="price-range">
          <div className="price-input" onClick={() => focusInput(maxInputRef)}>
            <span>Max</span>
            <input id="max" type="text" ref={maxInputRef} />
          </div>
          <div className="price-input" onClick={() => focusInput(minInputRef)}>
            <span>Min</span>
            <input id="min" type="text" ref={minInputRef} />
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
