import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage.js';
import HotelSearch from './hotelSearchPage/hotelsearch.js';
import YourDetail from './BookingDetails/yourDetail';
import PaymentPage from './PaymentMethod/paymentPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HotelSearch" element={<HotelSearch />} />
        <Route path="/Details" element={<YourDetail/>}/>
        <Route path="/Payment" element={<PaymentPage/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
