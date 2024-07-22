import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage.js';
import HotelSearch from './hotelSearchPage/hotelsearch.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HotelSearch" element={<HotelSearch />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
