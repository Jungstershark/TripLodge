import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import authService from '../UserAuth/authServices/authServices';
import PageHeader from '../pageHeader/pageHeader';
import BookingCard from './BookingCard';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await authService.authenticateUser();
      if (!isAuthenticated.authenticated) {
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }
      try {
        const response = await fetch(`/booking/customer/${isAuthenticated.userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          throw new Error('Failed to fetch bookings');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [user]);

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <PageHeader />
      <h1>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div>
          {bookings.map((booking) => (
            <BookingCard key={booking.bookingId} booking={booking} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
