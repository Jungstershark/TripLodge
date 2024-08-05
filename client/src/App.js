import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './landingPage/landingPage.js';
import HotelSearch from './hotelSearchPage/hotelsearch.js';
import YourDetail from './BookingDetails/yourDetail';
import PaymentPage from './PaymentMethod/paymentPage.js';
import Checkout from './CheckoutPage/checkout.js';
import Success from './CheckoutPage/Success.jsx';
import Cancel from './CheckoutPage/Cancel.jsx';
import Login from './UserAuth/loginPage/loginPage.js';
import Signup from './UserAuth/signupPage/signupPage.js';
import HotelDetailPage from './HotelDetail/hotelDetailPage.js';
// import Signup from './UserAuth/signupPage/signupPage.js';
// import ForgotPassword from './UserAuth/signupPage/signupPage.js'

function App() {
  const sampleProps = {
    hotelName: "The Fullerton Hotel",
    hotelPrice: 1000,
    customerEmailAddress: "john.doe@sutd.sg",
    destinationId: "WD0M",
    hotelId: "diH7",
    roomKey: "er-D4BA4388A2DE0E55F420A507ADAC2D99-65404D626BF42BC093C32658D4174A36",
    customerId: null,
    numberOfNights: '6',
    startDate: "2024-10-01",
    endDate: "2024-10-07",
    numAdults: '1',
    numChildren: '1',
    msgToHotel: "Please provide an extra bed.",
    roomTypes: "320753924",
    price: "3525.22",
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
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/hotel" element={<HotelDetailPage/>}/>
        {/* <Route path="/forgot-password" element={<ForgotPassword/>}/> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
