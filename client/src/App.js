  // const sampleProps = {
  //   hotelName: "The Fullerton Hotel",
  //   customerEmailAddress: "john.doe@sutd.sg",
  //   destinationId: "WD0M",
  //   hotelId: "diH7",
  //   roomKey: "er-D4BA4388A2DE0E55F420A507ADAC2D99-65404D626BF42BC093C32658D4174A36",
  //   customerId: null,
  //   numberOfNights: '6',
  //   startDate: "2024-10-01",
  //   endDate: "2024-10-07",
  //   numAdults: '1',
  //   numChildren: '1',
  //   msgToHotel: "Please provide an extra bed.",
  //   roomTypes: "320753924",
  //   price: "3525.22",
  //   guestSalutation: "Mr.",
  //   guestFirstName: "John",
  //   guestLastName: "Doe"
  // };
  import React, { useContext } from 'react';
  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import LandingPage from './landingPage/landingPage';
  import HotelSearch from './hotelSearchPage/hotelsearch';
  import YourDetail from './BookingDetails/yourDetail';
  import Checkout from './CheckoutPage/checkout';
  import Success from './CheckoutPage/Success';
  import Cancel from './CheckoutPage/Cancel';
  import Login from './UserAuth/loginPage/loginPage';
  import Signup from './UserAuth/signupPage/signupPage';
  import HotelDetailPage from './HotelDetail/hotelDetailPage';
  import CancelBookingPage from './CancelBooking/cancelBooking';
  import UserContext, { UserProvider } from './contexts/UserContext';
  
  // Component to handle route-based redirection
  function AppRoutes() {
      const { user } = useContext(UserContext); // Access user from context
  
      return (
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hotelSearch" element={<HotelSearch />} />
              <Route path="/details" element={<YourDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/hotel/:id" element={<HotelDetailPage />} />
              <Route path="/cancel-booking" element={<CancelBookingPage />} />
              <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all route */}
          </Routes>
      );
  }
  
  // Main App component
  export default function App() {
      return (
          <UserProvider>
              <BrowserRouter>
                  <AppRoutes />
              </BrowserRouter>
          </UserProvider>
      );
  }
  