import React, { useState } from 'react';
import { Button } from '@mui/material';

const BookingCard = ({ booking, onStatusChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCancelBooking = async () => {
    if (booking.paymentId && booking.bookingId) {
      try {
        const response = await fetch(`/booking/refund/${booking.bookingId}/${booking.paymentId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data.success) {
          // Notify parent to update the status
          onStatusChange(booking.bookingId, 'cancelled');
        } else {
          console.error('Update booking status failed:', data.message);
        }
      } catch (error) {
        console.error('Refund failed:', error);
      }
    } else {
      console.error('Payment ID or Booking ID is missing');
    }
  };

  return (
    <div>
      <div onClick={handleClick} style={{ cursor: 'pointer', border: '1px solid #ddd', marginBottom: '10px', padding: '10px' }}>
        <h3>Booking Reference No. {booking.bookingId}</h3>
        {isOpen && (
          <div>
            <p><strong>Hotel Name:</strong> {booking.hotelName}</p>
            <p><strong>Guest:</strong> {booking.guestSalutation} {booking.guestFirstName} {booking.guestLastName}</p>
            <p><strong>Room Type:</strong> {booking.roomTypes}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Number of Nights:</strong> {booking.numberOfNights}</p>
            <p><strong>Price:</strong> ${booking.price}</p>
            <p><strong>Check-in Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>Check-out Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p><strong>Message to Hotel:</strong> {booking.msgToHotel}</p>
            {booking.status.toLowerCase() !== 'cancelled' && (
              <Button variant="outlined" onClick={handleCancelBooking}>Cancel Booking</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
