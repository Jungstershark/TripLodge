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
  import ForgotPassword from './UserAuth/forgotPasswordPage/forgotPasswordPage.js';
  import ResetPassword from './UserAuth/resetPassword/resetPassword.js';
  import ViewBookings from './ViewBooking/ViewBooking.js';
  
  // Component to handle route-based redirection
  function AppRoutes() {
      const { user } = useContext(UserContext); // Access user from context
  
      return (
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hotelSearch" element={<HotelSearch />} />
              <Route path="/checkout" element={<YourDetail />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/hotel/:id" element={<HotelDetailPage />} />
              <Route path="/cancel-booking" element={<CancelBookingPage />} />
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/reset-password/:token" element={<ResetPassword/>}/>              
              <Route path="/view-booking" element={<ViewBookings/>}/>              
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
  
