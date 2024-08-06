import { Booking, insertBooking, findBookingByBookingId, findBookingByCustomerId, updateBookingStatus, removeBooking } from '../../src/models/booking.js';
import db from "../../src/models/db.js";

// Mock axios
jest.mock('axios');

// Mock the db module
jest.mock('../../src/models/db.js', () => ({
    promisedConnectionPool: Promise.resolve({
        query: jest.fn(),
    }),
    cleanup: jest.fn()
}));

// Mock row data from select query
const mockRowData = {
    bookingId: 1,
    status: 'confirmed',
    destinationId: 'DEST001',
    hotelName: 'Hotel ABC',
    hotelId: 'HOTEL001',
    roomKey: 'ROOM001',
    customerId: 123,
    numberOfNights: 3,
    startDate: '2023-08-01',
    endDate: '2023-08-04',
    numAdults: 2,
    numChildren: 1,
    msgToHotel: 'Special request',
    roomTypes: 'Deluxe',
    price: 500.00,
    guestSalutation: 'Mr',
    guestFirstName: 'John',
    guestLastName: 'Doe',
    paymentId: 'PAY001',
    payeeId: 'PAYEE001'
};

const mockRows = [mockRowData, {...mockRowData, bookingId: 2, status: 'pending'}];

describe('Booking Model', () => {
    let mockPool;
    let consoleErrorSpy;
    let consoleLogSpy;

    beforeAll(async () => {
        mockPool = await db.promisedConnectionPool;
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Booking Class', () => {
        test('creates a valid Booking object', () => {
            const booking = new Booking(
                1, 'confirmed', 'DEST001', 'Hotel ABC', 'HOTEL001', 'ROOM001',
                123, 3, '2023-08-01', '2023-08-04', 2, 1, 'Special request',
                'Deluxe', 500.00, 'Mr', 'John', 'Doe', 'PAY001', 'PAYEE001'
            );
    
            expect(booking.bookingId).toBe(1);
            expect(booking.status).toBe('confirmed');
            expect(booking.destinationId).toBe('DEST001');
            expect(booking.hotelName).toBe('Hotel ABC');
            expect(booking.hotelId).toBe('HOTEL001');
            expect(booking.roomKey).toBe('ROOM001');
            expect(booking.customerId).toBe(123);
            expect(booking.numberOfNights).toBe(3);
            expect(booking.startDate).toEqual(new Date('2023-08-01'));
            expect(booking.endDate).toEqual(new Date('2023-08-04'));
            expect(booking.numAdults).toBe(2);
            expect(booking.numChildren).toBe(1);
            expect(booking.msgToHotel).toBe('Special request');
            expect(booking.roomTypes).toBe('Deluxe');
            expect(booking.price).toBe(500.00);
            expect(booking.guestSalutation).toBe('Mr');
            expect(booking.guestFirstName).toBe('John');
            expect(booking.guestLastName).toBe('Doe');
            expect(booking.paymentId).toBe('PAY001');
            expect(booking.payeeId).toBe('PAYEE001');
        });
    });

    describe('insertBooking', () => {
        test('inserts a booking and returns the insertId', async () => {
            const mockInsertId = 1;
            mockPool.query.mockResolvedValue([{ insertId: mockInsertId, affectedRows: 1 }]);

            const booking = new Booking(
                null, 'confirmed', 'DEST001', 'Hotel ABC', 'HOTEL001', 'ROOM001',
                123, 3, '2023-08-01', '2023-08-04', 2, 1, 'Special request',
                'Deluxe', 500.00, 'Mr', 'John', 'Doe', 'PAY001', 'PAYEE001'
            );

            const result = await insertBooking(booking);
            expect(result).toBe(mockInsertId); // Should return the insertId (auto-incremented ID of newly inserted record)
            expect(mockPool.query).toHaveBeenCalledTimes(1);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO Booking'),
                expect.arrayContaining([
                'confirmed', 'DEST001', 'Hotel ABC', 'HOTEL001', 'ROOM001',
                123, 3, expect.any(Date), expect.any(Date), 2, 1, 'Special request',
                'Deluxe', 500.00, 'Mr', 'John', 'Doe', 'PAY001', 'PAYEE001'
                ])
            );
        });

        test('throws an error when insertion fails', async () => {
            const error = new Error('Insertion failed');
            mockPool.query.mockRejectedValue(error);

            const booking = new Booking(
                null, 'confirmed', 'DEST001', 'Hotel ABC', 'HOTEL001', 'ROOM001',
                123, 3, '2023-08-01', '2023-08-04', 2, 1, 'Special request',
                'Deluxe', 500.00, 'Mr', 'John', 'Doe', 'PAY001', 'PAYEE001'
            );

            await expect(insertBooking(booking)).rejects.toThrow('Insertion failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database connection failed: ' + error);
        });
    });

    describe('findBookingByBookingId', () => {
        test('returns a booking when found', async () => {
            mockPool.query.mockResolvedValue([[mockRowData], {metadata: 'unused'}]);

            const result = await findBookingByBookingId(1);
            expect(result).toBeInstanceOf(Booking); // Should return booking object
            expect(result.bookingId).toBe(1);
            expect(result.status).toBe('confirmed');
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM Booking WHERE bookingId = ?'),
                [1]
            );
        });

        test('returns null when booking is not found', async () => {
            mockPool.query.mockResolvedValue([[], {metadata: 'unused'}]);

            const result = await findBookingByBookingId(999);
            expect(result).toBeNull();
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(findBookingByBookingId(1)).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database query failed: ' + error);
        });
    });

    describe('findBookingByCustomerId', () => {
        test('returns an array of bookings when found', async () => {
            mockPool.query.mockResolvedValue([mockRows]);

            const result = await findBookingByCustomerId(123);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(Booking);
            expect(result[1]).toBeInstanceOf(Booking);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM Booking WHERE customerId = ?'),
                [123]
            );
        });

        test('returns null when no bookings are found', async () => {
            mockPool.query.mockResolvedValue([[]]);

            const result = await findBookingByCustomerId(999);
            expect(result).toBeNull();
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(findBookingByCustomerId(123)).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database query failed: ' + error);
        });
    });

    describe('updateBookingStatus', () => {
        test('updates the booking status', async () => {
            const mockResult = { affectedRows: 1 };
            mockPool.query.mockResolvedValue([mockResult]);

            const result = await updateBookingStatus(1, 'cancelled');
            expect(result).toEqual(mockResult);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining("UPDATE Booking"),
                ['cancelled', 1]
            );
        });

        test('returns null when no booking is found to update', async () => {
            const mockResult = { affectedRows: 0 };
            mockPool.query.mockResolvedValue([mockResult]);

            const result = await updateBookingStatus(999, 'cancelled');
            expect(result).toBeNull();
        });

        test('throws an error when update fails', async () => {
            const error = new Error('Update failed');
            mockPool.query.mockRejectedValue(error);

            await expect(updateBookingStatus(1, 'cancelled')).rejects.toThrow('Update failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database update failed: ' + error);
        });
    });

    describe('removeBooking', () => {
        test('removes a booking', async () => {
            const mockResult = { affectedRows: 1 };
            mockPool.query.mockResolvedValue([mockResult]);

            const result = await removeBooking(1);
            expect(result).toEqual(mockResult);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('DELETE FROM Booking WHERE bookingId = ?'),
                [1]
            );
        });

        test('throws an error when booking does not exist', async () => {
            const mockResult = { affectedRows: 0 };
            mockPool.query.mockResolvedValue([mockResult]);

            await expect(removeBooking(999)).rejects.toThrow('Booking with ID 999 does not exist.');
        });

        test('throws an error when deletion fails', async () => {
            const error = new Error('Deletion failed');
            mockPool.query.mockRejectedValue(error);

            await expect(removeBooking(1)).rejects.toThrow('Deletion failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to remove booking: " + error);
        });
    });
});