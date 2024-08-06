// /src/pageHeader/pageHeader.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './pageHeader.css';

function PageHeader() {
  const navigate = useNavigate();
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('SGD');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCurrencyClick = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
  };

  return (
    <header>
      <ul>
        <li className="Logo">
          <button onClick={handleLogoClick} className="logobutton">
            <img src={process.env.PUBLIC_URL + "/Ascenda_Blue_Logo.jpg"} alt="Error displaying logo" />
          </button>
        </li>
        <li className="SignIn">
          <Link to="/login">Sign in</Link>
        </li>
        <li className="ContactUs">
          <a href="#contactus">Contact Us</a>
        </li>
        <li className="SGD">
          <button onClick={handleCurrencyClick}>{selectedCurrency} ▼</button>
          {showCurrencyDropdown && (
            <div id="currency-dropdown">
              <div onClick={() => handleCurrencySelect('SGD')}>SGD</div>
              <div onClick={() => handleCurrencySelect('USD')}>USD</div>
              <div onClick={() => handleCurrencySelect('EUR')}>EUR</div>
              <div onClick={() => handleCurrencySelect('JPY')}>JPY</div>
            </div>
          )}
        </li>
      </ul>
    </header>
  );
}

export default PageHeader;
