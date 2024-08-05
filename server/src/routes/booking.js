import express from 'express';
import { viewBooking, viewCustomerBookings, cancelBooking, createBooking, createStripeCheckout, stripeWebhook, stripeRefund } from '../controllers/bookHotelController.js'; 


const router = express.Router();

router.get('/view/:id', viewBooking); // View booking
router.get('/customer/:id', viewCustomerBookings); // View customer's bookings
router.get('/cancel/:id', cancelBooking); // Cancel booking
router.post('/create', createBooking); // Create a hotel booking
router.post('/checkout', createStripeCheckout); // Create a stripe checkout
router.post('/webhook', stripeWebhook);
router.post('/refund/:bookingId/:paymentId', stripeRefund) // Refund request for booking 

export default router;