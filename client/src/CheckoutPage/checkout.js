import React from 'react';
import axios from 'axios';

const Checkout = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {bookingInformation:{name:"name", gender:"gender" }}; // bookingInformation must be an object where the values are string (i.e. NO nested objects)

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