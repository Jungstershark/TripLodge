import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CancelBookingPage.css'; // Import the CSS file

const CancelBookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentId, setPaymentId] = useState(null); // Added state for paymentId
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const bookingId = query.get('bookingId');
    const paymentIdFromQuery = query.get('paymentId'); // Extract paymentId from query

    setPaymentId(paymentIdFromQuery); // Set paymentId state

    if (bookingId) {
      // Fetch booking details from backend
      fetch(`/booking/view/${bookingId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setBooking(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to fetch booking details');
          setLoading(false);
        });
    } else {
      setError('No booking ID provided');
      setLoading(false);
    }
  }, [location.search]);

  const handleCancel = async () => {
    if (paymentId && booking) {
      try {
        console.log("button clicked");
        const response = await fetch(`/booking/refund/${booking.bookingId}/${paymentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data.success) {
          setBooking(prevBooking => ({
            ...prevBooking,
            status: 'cancelled'
          }));
        } else {
            console.error('Update booking status failed:', data.message);
        }
      } catch (error) {
        console.error('Refund failed:', error);
      }
    } else {
      console.error('Payment ID is missing');
    }
  };

  if (loading) {
    return <div className="cancel-booking-page">Loading...</div>;
  }

  if (error) {
    return <div className="cancel-booking-page">{error}</div>;
  }

  return (
    <div className="cancel-booking-page">
      <h1>Cancel Booking</h1>
      {booking ? (
        <div className="booking-details">
          <h2>Booking Details</h2>
          <p><strong>Booking ID:</strong> {booking.bookingId}</p>
          <p><strong>Hotel Name:</strong> {booking.hotelName}</p>
          <p><strong>Room Type:</strong> {booking.roomTypes}</p>
          <p><strong>Check-in Date:</strong> {booking.startDate}</p>
          <p><strong>Check-out Date:</strong> {booking.endDate}</p>
          <p><strong>Number of Guests:</strong> {booking.numAdults} adults, {booking.numChildren} children</p>
          <p><strong>Price:</strong> ${booking.price}</p>
          <br/>
          {booking.status==="cancelled" ? (
            <p className="cancel-success-message">Booking successfully cancelled</p>
          ) : (
            <button onClick={handleCancel} className="cancel-button">Confirm Cancellation</button>
          )}
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
    </div>
  );
};

export default CancelBookingPage;