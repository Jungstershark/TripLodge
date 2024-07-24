import express from 'express';
import { viewBooking, viewCustomerBookings, cancelBooking, createBooking } from '../controllers/bookHotelController.js'; 


const router = express.Router();

router.get('/view/:id', viewBooking); // View booking
router.get('/customer/:id', viewCustomerBookings); // View customer's bookings
router.get('/cancel/:id', cancelBooking); // Cancel booking
router.post('/create', createBooking); // Create a hotel booking

export default router;