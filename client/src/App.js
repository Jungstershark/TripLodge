import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage.js';
import HotelSearch from './hotelSearchPage/hotelsearch.js';
import YourDetail from './BookingDetails/yourDetail';
import PaymentPage from './PaymentMethod/paymentPage.js';
import Checkout from './CheckoutPage/checkout.js';
import Success from './CheckoutPage/Success.jsx';
import Cancel from './CheckoutPage/Cancel.jsx';

function App() {
  const sampleProps = {
    customerEmailAddress: "customer@example.com",
    destinationId: "dest_123456",
    hotelId: "hotel_78910",
    roomKey: "room_1112",
    customerId: "cust_131415",
    numberOfNights: '3',
    startDate: "2024-08-01",
    endDate: "2024-08-04",
    numAdults: '2',
    numChildren: '1',
    msgToHotel: "Please provide an extra bed.",
    roomTypes: "deluxe",
    price: "200.00",
    guestSalutation: "Mr.",
    guestFirstName: "John",
    guestLastName: "Doe"
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/HotelSearch" element={<HotelSearch />} />
        <Route path="/Details" element={<YourDetail/>}/>
        <Route path="/Payment" element={<PaymentPage/>}/>
        <Route path="/checkout" element={<Checkout {...sampleProps} />}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
