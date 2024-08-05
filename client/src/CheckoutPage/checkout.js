import React from 'react';
import axios from 'axios';

const Checkout = ({
  hotelName,
  hotelPrice,
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

    const body = {
      hotelName,
      hotelPrice: hotelPrice * 100, 
      bookingInformation:{
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
    }}; // bookingInformation must be an object where the values are string (i.e. NO nested objects)

    try {
      console.log("button clicked");
      const response = await axios.post('/booking/checkout', body);
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
      <head>
        <title>Buy cool new product</title>
      </head>
      <body>
        <form onSubmit={handleSubmit}>
          <button type="submit">Checkout</button>
        </form>
      </body>
    </div>
  );
};

export default Checkout;