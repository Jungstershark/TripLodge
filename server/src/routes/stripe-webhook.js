import Stripe from 'stripe';
import express from 'express';
import 'dotenv/config'
import axios from 'axios';


const router = express.Router();
const stripe = Stripe(process.env.STRIPE_TEST_KEY);

// Stripe sends webhook events as JSON payload but need to get the raw request (see comments below try)
router.post('/', async (req, res) => { // only requests with the Content-Type: application/json header will be parse as raw Buffer
    const event = req.body;

    switch(event.type){
        case('checkout.session.completed'):
            const checkoutSession = event.data.object;
            const bookingInformation = checkoutSession.metadata
            const billingEmail = checkoutSession.customer_details.email
            const payeeId = checkoutSession.payment_intent
            const paymentIntentSession = await stripe.paymentIntents.retrieve(payeeId)
            const paymentId = paymentIntentSession.latest_charge;

            const combinedBookingInformationForDB = {
                billingEmail,
                ...bookingInformation,
                paymentId,
                payeeId
            }

            try {
                // Send the combined booking information to the createBooking route
                await axios.post('http://localhost:5000/booking/create', combinedBookingInformationForDB);
            } catch (error) {
                console.error('Error creating booking:', error);
            }
            break;
        case('payment_intent.created'):
            const paymentIntentCreatedSession = event.data.object;
            paymentIntentCreatedSession.receipt_email = process.env.MAIL_USER;
            console.log(paymentIntentCreatedSession);
    }

    res.sendStatus(200);
});

export default router;