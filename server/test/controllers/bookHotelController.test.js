import request from 'supertest';
import express from 'express';
import bookingRouter from '../../src/routes/booking.js';

import db from "../../src/models/db.js"; // Booking model uses db
import dbMock from '../dbTest.js'; // DB for testing
import Stripe from 'stripe';
import axios from 'axios'; // Hotel model uses ascenda API
import { ascendaAPI } from '../../src/models/ascendaApi.js';
import 'dotenv/config'

import { Booking, insertBooking, findBookingByBookingId, findBookingByCustomerId, updateBookingStatus, removeBooking, setTableName } from "../../src/models/booking.js";
import { sendBookingConfirmationEmail, sendCancelBookingEmail } from "../../src/controllers/sendEmailController.js";
import { fetchHotel } from "../../src/models/hotel.js"; 

// Setup the Express app
const app = express();
app.use(express.json());
app.use('/booking', bookingRouter);

// Mock DB: due to conflicts between jest and our actual db implementation, we use a mock db connection for testing purposes
// Additionally: a separate table for testing purposes is initialized
jest.mock('../../src/models/db.js', () => require('../dbTest.js')); // Use mock db connection

// Mock Stripe
const mockSession = { id: 'sess_123', url: 'https://checkout.stripe.com/pay/cs_test_123' };
jest.mock('stripe', () => {
    return jest.fn().mockImplementation(() => ({
        checkout: {
            sessions: {
                create: jest.fn().mockResolvedValue({ id: 'sess_123', url: 'https://checkout.stripe.com/pay/cs_test_123' }) // Define behavior in the test
            }
        },
        paymentIntents: {
            update: jest.fn().mockResolvedValue({latest_charge: 'paymentIdTest'})
        },
        refunds: {
            create: jest.fn().mockResolvedValue({status: 'succeeded'})
        } 
    }));
});


// Mock email sending
jest.mock('../../src/controllers/sendEmailController');

// Mock axios (to mock ascenda's API)
jest.mock('axios');


describe("Book Hotel API Integration Tests", () => {
    let consoleErrorSpy;
    let consoleLogSpy;

    beforeAll(() => {
        setTableName(dbMock.testTableName);
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    beforeEach(() => {
        // Clear all mock implementations before each test
        jest.clearAllMocks();
    });

    afterAll(async () => {
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
        await db.cleanup(); // tearsdown the test booking table and closes db connection
    });

    describe("GET /booking/view/:id", () => {
        test("return booking object with given booking ID", async () => {
            const bookingId = 1;

            const res = await request(app).get(`/booking/view/${bookingId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({
                bookingId: bookingId,
                status: 'confirmed',
                destinationId: 'WD0M',
                hotelName: 'Test Hotel 1',
                hotelId: 'diH7',
                roomKey: 'er-D4BA4388A2DE0E55F420A507ADAC2D99-A1951C279575DC3CD79C0B549A2A27E9',
                customerId: 1,
                numberOfNights: 6,
                startDate: '2024-09-30T16:00:00.000Z',
                endDate: '2024-10-06T16:00:00.000Z',
                numAdults: 1,
                numChildren: 1,
                msgToHotel: 'Please provide a crib.',
                roomTypes: 'suite',
                price: 450.00,
                guestSalutation: 'Ms.',
                guestFirstName: 'Alice',
                guestLastName: 'Wonder',
                paymentId: '1001',
                payeeId: '2001'
            });
        });

        test("response body is null if booking cannot be found", async () => {
            const bookingId = 900000000;

            const res = await request(app).get(`/booking/view/${bookingId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeNull();
        });
    });

    describe("GET /booking/customer/:id", () => {
        test("should return bookings associated with customer id", async () => {
            const customerId = 1;
            const res = await request(app).get(`/booking/customer/${customerId}`);

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body).toHaveLength(1); // only one record in bookingtest db with customerId = 1
            expect(res.body[0].customerId).toBe(1);
        });

        test("response body is null if no bookings associated with customer can be found", async () => {
            const customerId = 900000000;

            const res = await request(app).get(`/booking/customer/${customerId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toBeNull();
        });
    });

    describe("GET /booking/cancel/:id", () => {
        test("set booking's status to cancel", async () => {
            const bookingId = 1;
            let viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('confirmed'); // Confirm that booking is initially 'confirmed'

            const res = await request(app).get(`/booking/cancel/${bookingId}`);
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe("Success: booking cancelled"); // Should get success response

            // Verify that status has indeed changed in db
            viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('cancelled'); // Confirm that booking is now set to 'cancelled'

            // Cleanup: set booking (bookingId=1) back to 'confirmed'
            await updateBookingStatus(bookingId, 'confirmed');
            viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('confirmed');
        });

        test("should receive failure response if booking cannot be found", async () => {
            const bookingId = 900000000;

            const res = await request(app).get(`/booking/cancel/${bookingId}`);
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe("Failure: booking cannot be found"); // Should get failure response
        });
    });

    describe("POST /booking/create", () => {
        test("should create booking", async () => {
            const mockBookingData = {
                billingEmail: 'test@example.com',
                destinationId: 'destination1',
                hotelName: 'Special Hotel',
                hotelId: '444',
                roomKey: 'room1',
                customerId: '1',
                numberOfNights: 2,
                startDate: '2023-08-01',
                endDate: '2023-08-03',
                numAdults: 2,
                numChildren: 0,
                msgToHotel: 'Test message',
                roomTypes: 'Standard',
                price: 200.00,
                guestSalutation: 'Mr',
                guestFirstName: 'John',
                guestLastName: 'Doe',
                paymentId: 'ch_123',
                payeeId: 'pi_123'
            };

            // Mock the ascenda API response (for fetching hotel details)
            const mockHotelData = {
                id: '444',
                name: 'Special Hotel',
                latitude: 1.2345,
                longitude: 6.7890,
                address: '123 Test St',
                rating: 4.5,
                categories: ['Luxury'],
                description: 'A test hotel',
                amenities: ['WiFi', 'Pool'],
                image_details: { url: 'http://test.com/image.jpg' }
            };
            axios.get.mockResolvedValue({ data: mockHotelData });
            
            let res = await request(app)
                .post('/booking/create')
                .send(mockBookingData);

            expect(res.status).toBe(200);
            expect(res.body).toEqual({bookingId: 4}); // Will be 4 because our test booking table only has 3 entries

            // Verify that newly created booking is in database
            const bookingId = res.body.bookingId;
            res = await request(app).get(`/booking/view/${bookingId}`);
            expect(res.body.bookingId).toBe(bookingId);
            expect(res.body.hotelName).toBe(mockBookingData.hotelName);
            expect(res.body.hotelId).toBe(mockBookingData.hotelId);
            expect(res.body.roomKey).toBe(mockBookingData.roomKey);

        });
    });

    describe("POST /booking/checkout", () => {
        test("should create a Stripe checkout session", async () => {
            const res = await request(app)
                .post('/booking/checkout')
                .send({
                    bookingInformation: {
                        hotelName: 'Test Hotel',
                        price: '100.00',
                        // More information usually but rest is not needed for testing
                    }
                });
            
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockSession);
        });
    });

    describe("POST /booking/webhook", () => {
        const mockData = {
            type: 'charge.succeeded',
            data: {
                object: {
                    id: 'session1',
                    metadata: {},
                    customer_details: {email: 'hithere@gmail.com'},
                    payment_intent: 'pi_123',
                }
            }
        };

        test("charge succeeded event should log session id", async () => {
            const sessionDetails = mockData;
            const res = await request(app)
                .post('/booking/webhook')
                .send(sessionDetails); 

            expect(consoleLogSpy).toHaveBeenCalledWith(sessionDetails.data.object.id);
        });

        test("session complete event should call createBookingRoute", async () => {
            const sessionDetails = {...mockData, type: 'checkout.session.completed'};
            const res = await request(app)
                .post('/booking/webhook')
                .send(sessionDetails); 

            expect(consoleLogSpy).toHaveBeenCalledWith(sessionDetails.data.object);
            // Calls create booking route - params should match mock data
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/booking/create', {
                billingEmail: "hithere@gmail.com",
                payeeId: 'pi_123',
                paymentId: 'paymentIdTest'
            });
        });

        test("payment intent created event should log session with added receipt email", async () => {
            const sessionDetails = {...mockData, type: 'payment_intent.created'};
            const res = await request(app)
                .post('/booking/webhook')
                .send(sessionDetails); 

            expect(consoleLogSpy).toHaveBeenCalledWith({...sessionDetails.data.object, receipt_email: process.env.MAIL_USER});
        });

        test("refund created event should log refund message", async () => {
            const sessionDetails = {...mockData, type: 'refund.created'};
            const res = await request(app)
                .post('/booking/webhook')
                .send(sessionDetails); 

            expect(consoleLogSpy).toHaveBeenCalledWith('Refund Created:', sessionDetails.data.object);
        });

        test("refund updated event should log refund updated message", async () => {
            const sessionDetails = {...mockData, type: 'refund.updated'};
            const res = await request(app)
                .post('/booking/webhook')
                .send(sessionDetails); 

            expect(consoleLogSpy).toHaveBeenCalledWith('Refund Updated:', sessionDetails.data.object);
        });

    });

    describe("POST /booking/refund/:bookingId/:paymentId", () => {
        test("successfully process refund", async () => {
            const bookingId = '1'; // entry in test booking table
            const paymentId = '456';

            // Show that booking with id 1 has status 'confirmed' at first 
            let viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('confirmed');

            // Mock ascenda API response (for fetchHotel call)
            const mockHotelData = {
                id: '444',
                name: 'Special Hotel',
                latitude: 1.2345,
                longitude: 6.7890,
                address: '123 Test St',
                rating: 4.5,
                categories: ['Luxury'],
                description: 'A test hotel',
                amenities: ['WiFi', 'Pool'],
                image_details: { url: 'http://test.com/image.jpg' }
            };
            axios.get.mockResolvedValue({ data: mockHotelData });

            // Test refund endpoint
            const res = await request(app)
                .post(`/booking/refund/${bookingId}/${paymentId}`);

            // Refund successful - the booking's status should be cancelled from db
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:5000/booking/cancel/${bookingId}`);
            // Because axios is being mocked right now, we manually call cancel booking end point
            const cancelRes = await request(app).get(`/booking/cancel/${bookingId}`);
            expect(cancelRes.statusCode).toBe(200);
            expect(cancelRes.text).toBe("Success: booking cancelled"); // Already tested in previous tests, can assume that booking is now set to 'cancelled'
            // Confirm that booking is now set to 'cancelled'
            viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('cancelled');

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ success: true });

            // Cleanup: set booking back to 'confirmed'
            await updateBookingStatus(bookingId, 'confirmed');
            viewRes = await request(app).get(`/booking/view/${bookingId}`);
            expect(viewRes.body.status).toBe('confirmed');
            
        });
    });

});

