import React from 'react';
import axios from 'axios';
import YourDetail from '../BookingDetails/yourDetail';
import { useLocation } from 'react-router-dom';

const Checkout = ({
  hotelName,
  customerEmailAddress,
  destinationId,
  hotelId,
  roomKey,
  customerId,
  numberOfNights,
  startDate,
  endDate,
  numAdults,
  numChildren,
  msgToHotel,
  roomTypes,
  price,
  guestSalutation,
  guestFirstName,
  guestLastName
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("button clicked in yourdetail")

    const body = {
      bookingInformation:{
        customerEmailAddress,
        destinationId,
        hotelName,
        hotelId,
        roomKey,
        customerId,
        numberOfNights,
        startDate,
        endDate,
        numAdults,
        numChildren,
        msgToHotel,
        roomTypes,
        price,
        guestSalutation,
        guestFirstName,
        guestLastName
    }}; // bookingInformation must be an object where the values are string (i.e. NO nested objects)

    try {
      console.log("button clicked");
      const response = await axios.post('/checkout/create-session-token', body);
      const session = response.data;
      if (session.url) {
        window.location.href = session.url; // Redirect to the Stripe checkout page
      } else {
        console.error('Error creating checkout session:', session);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
        <YourDetail onConfirmBooking={handleSubmit}/>
        {/* <form onSubmit={handleSubmit}>
          <button type="submit">Checkout</button>
        </form> */}
    </div>
  );
};

export default Checkout;