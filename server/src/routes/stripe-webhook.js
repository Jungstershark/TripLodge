import Stripe from 'stripe';
import express from 'express';
import 'dotenv/config'

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_TEST_KEY);

// Stripe sends webhook events as JSON payload but need to get the raw request (see comments below try)
router.post('/', async (req, res) => { // only requests with the Content-Type: application/json header will be parse as raw Buffer
    const event = req.body;
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            console.log(checkoutSession);
            console.log('Booking details: ', checkoutSession.metadata);
            console.log('Billing email:', checkoutSession.customer_details.email);
            break;

        case 'charge.succeeded':
            const chargeSucceedSession = event.data.object;
            console.log('Charge succeeded:', chargeSucceedSession);
            break;

        case 'payment_intent.created':
            const paymentIntentCreated = event.data.object;
            console.log('Payment intent created:', paymentIntentCreated);
            break;

        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log('Payment intent succeeded:', paymentIntentSucceeded);
            break;

        case 'charge.updated':
            const chargeUpdatedSession = event.data.object;
            console.log('Charge updated:', chargeUpdatedSession);
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

export default router;