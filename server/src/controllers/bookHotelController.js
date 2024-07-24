import { Booking, insertBooking, findBookingByBookingId, findBookingByCustomerId, updateBookingStatus, removeBooking } from "../models/booking.js";
import { sendBookingConfirmationEmail } from "./sendEmailController.js";
import { fetchHotel } from "../models/hotel.js"; 

async function viewBooking(req, res, next) {
    const id  = req.params.id; // Booking ID
    try {
        const booking = await findBookingByBookingId(id);
        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
}

async function viewCustomerBookings(req, res, next) {
    const id  = req.params.id; // Customer ID
    try {
        const bookings = await findBookingByCustomerId(id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
}

async function cancelBooking(req, res, next) {
    const id  = req.params.id; // Booking ID
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Step 1: Refund via payment gate

    // Step 2: If refund successful (approved), remove booking from database
    try {
        await updateBookingStatus(id, "cancelled");
        res.send("Success: booking cancelled");
    } catch (error) {
        res.status(500).json({ error: error.message || error });
    }
}

async function createBooking(req, res, next) {
    const {
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
        guestLastName,
        paymentId,
        payeeId} = req.body;

    // Step 1: Process payment

    // Step 2: If payment successful, create booking
    const booking = Booking(null, // bookingId: dummy value (will be generated on database insertion)
        "confirmed", // status
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
        guestLastName,
        paymentId,
        payeeId);
    // If customer not logged-in, customerId will be null

    const bookingId = await insertBooking(booking); // Booking ID generated by database upon insertion (auto-increment primary key)
    booking.bookingId = bookingId; // update Booking instance

    // Step 3: Send booking confirmation email
    const bookedHotel = await fetchHotel(booking.hotelId); // To get the details of the booked hotel
    await sendBookingConfirmationEmail(booking, bookedHotel, customerEmailAddress);

    // Step 4: respond back with success message
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({bookingId: bookingId});
}

export { viewBooking, viewCustomerBookings, cancelBooking, createBooking };

