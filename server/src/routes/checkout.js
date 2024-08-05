import express from "express";
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_TEST_KEY);

const router = express.Router();

router.post('/create-session-token', async (req, res) => {
    console.log("express says hello");
    console.log(req.body.bookingInformation)
    const session = await stripe.checkout.sessions.create({
    line_items: [
        {
        price_data: {
            currency: 'usd',
            product_data: {
            name: 'T-shirt',
            }, 
            unit_amount: 2000,
        },
        quantity: 1,
        },
    ],
    metadata: req.body.bookingInformation, // metadata must be single object where values are strings (i.e. NO nested objects)
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    // console.log("Receive booking information: ", bookingInformation);
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send(session);
});

export default router;