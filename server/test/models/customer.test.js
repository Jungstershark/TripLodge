import { findBookingByCustomerId } from '../../src/models/booking.js';
import { Customer, insertCustomer, findOneByCustomerId, findUserByEmail, updateUser, findUserByToken } from '../../src/models/customer.js';
import db from "../../src/models/db.js";

// Mock the db module
// Testing together with actual db (not mocked) is done in integration testing
jest.mock('../../src/models/db.js', () => ({
    promisedConnectionPool: Promise.resolve({
        query: jest.fn(),
    }),
    cleanup: jest.fn()
}));

// Mock row data from select query
const mockRowData = {
    customerId: 1,
    username: 'mock_customer',
    email: 'mock@example.com',
    password: 'password123',
    hp: '999-0009'
};

const mockRows = [mockRowData, {...mockRowData, customerId: 2, username: 'second_customer', email: 'second@example.com'}];

//username, email, password, hp
//'test_customer', 'alice@example.com', 'password123', '555-0001'

describe('Customer Model', () => {
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

    describe('Customer Class', () => {
        test('creates a valid Customer object (without reset password fields)', () => {
            const mockCustomer = new Customer(
                mockRowData.customerId,
                mockRowData.username,
                mockRowData.email,
                mockRowData.password,
                mockRowData.hp
            );

            expect(mockCustomer).toBeInstanceOf(Customer);
            expect(mockCustomer.customerId).toBe(mockRowData.customerId);
            expect(mockCustomer.username).toBe(mockRowData.username);
            expect(mockCustomer.email).toBe(mockRowData.email);
            expect(mockCustomer.password).toBe(mockRowData.password);
            expect(mockCustomer.hp).toBe(mockRowData.hp);
            expect(mockCustomer.resetPasswordToken).toBeNull();
            expect(mockCustomer.resetPasswordExpires).toBeNull();
        });

        test('creates a valid Customer object (with reset password fields)', () => {
            const mockCustomer = new Customer(
                mockRowData.customerId,
                mockRowData.username,
                mockRowData.email,
                mockRowData.password,
                mockRowData.hp,
                'exampleToken',
                '2023-08-15'
            );

            expect(mockCustomer).toBeInstanceOf(Customer);
            expect(mockCustomer.customerId).toBe(mockRowData.customerId);
            expect(mockCustomer.username).toBe(mockRowData.username);
            expect(mockCustomer.email).toBe(mockRowData.email);
            expect(mockCustomer.password).toBe(mockRowData.password);
            expect(mockCustomer.hp).toBe(mockRowData.hp);
            expect(mockCustomer.resetPasswordToken).toBe('exampleToken');
            expect(mockCustomer.resetPasswordExpires).toBe('2023-08-15');
        });
    });

    describe('insertCustomer', () => {
        test('creates a valid Customer object and returns the insertId', async () => {
            const mockCustomer = new Customer(
                mockRowData.customerId,
                mockRowData.username,
                mockRowData.email,
                mockRowData.password,
                mockRowData.hp
            );
            const mockInsertId = 1;
            mockPool.query.mockResolvedValue([{ insertId: mockInsertId, affectedRows: 1 }]);

            const result = await insertCustomer(mockCustomer);
            expect(result).toBe(mockInsertId); // Should return the insertId (auto-incremented ID of newly inserted record)
            expect(mockPool.query).toHaveBeenCalledTimes(1);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO Customer'),
                expect.arrayContaining([
                    mockCustomer.username, mockCustomer.email, mockCustomer.password, mockCustomer.hp
                ])
            );
        });

        test('throws an error when insertion fails', async () => {
            const error = new Error('Insertion failed');
            mockPool.query.mockRejectedValue(error);

            const mockCustomer = new Customer(
                mockRowData.customerId,
                mockRowData.username,
                mockRowData.email,
                mockRowData.password,
                mockRowData.hp
            );

            await expect(insertCustomer(mockCustomer)).rejects.toThrow('Insertion failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database connection failed:', error);
        });
    });

    describe('findOneByCustomer', () => {
        test('returns a Customer instance from customer Id', async () => {
            mockPool.query.mockResolvedValue([[mockRowData], {metadata: 'unused'}]);

            const result = await findOneByCustomerId(mockRowData.id);
            expect(result).toBeInstanceOf(Customer); // should be single Customer object
            expect(result.customerId).toBe(mockRowData.customerId);
            expect(result.username).toBe(mockRowData.username);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM Customer WHERE customerId = ?'),
                [mockRowData.id]
            );
        });
        test('returns null when customer is not found', async () => {
            mockPool.query.mockResolvedValue([[], {metadata: 'unused'}]);

            const result = await findOneByCustomerId(999);
            expect(result).toBeNull();
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(findOneByCustomerId(1)).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database query failed:', error);
        });
    });

    describe('findUserByEmail', () => {
        test('returns a Customer instance that has matching email', async () => {
            mockPool.query.mockResolvedValue([[mockRowData], {metadata: 'unused'}]);

            const result = await findUserByEmail(mockRowData.email);
            expect(result).toBeInstanceOf(Customer); // should be single Customer object
            expect(result.email).toBe(mockRowData.email);
            expect(result.customerId).toBe(mockRowData.customerId);
            expect(result.username).toBe(mockRowData.username);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM Customer WHERE email = ?'),
                [mockRowData.email]
            );
        });

        test('returns null when no matching customers found', async () => {
            mockPool.query.mockResolvedValue([[], {metadata: 'unused'}]);

            const result = await findUserByEmail('abcdefghijklmnop@yahoo.sg');
            expect(result).toBeNull();
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(findUserByEmail(mockRowData.email)).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database query failed:', error);
        });
    });

    describe('updateUser', () => {
        test('returns true if 1 or more entries affected', async () => {
            mockPool.query.mockResolvedValue([{affectedRows: 1}]);
            const result = await updateUser(mockRowData.customerId, {email: "new@new.com"});

            expect(result).toBe(true);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE Customer SET email = ? WHERE customerId = ?'),
                ["new@new.com", mockRowData.customerId]
            );
        });

        test('returns false if 0 entries affected', async () => {
            mockPool.query.mockResolvedValue([{affectedRows: 0}]);

            const result = await updateUser(999, {email: "new@new.com"});
            expect(result).toBe(false);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE Customer SET email = ? WHERE customerId = ?'),
                ["new@new.com", 999]
            );
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(updateUser(mockRowData.customerId, {email: "new@new.com"})).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database update failed:', error);
        });
    });

    describe('findUserByToken', () => {
        test('returns a Customer instance that has matching reset password token', async () => {
            const newMockRowData = {...mockRowData, resetPasswordToken: 'exampleToken', resetPasswordExpires: '2023-08-15'}
            mockPool.query.mockResolvedValue([[newMockRowData], {metadata: 'unused'}]);

            const result = await findUserByToken('exampleToken');
            expect(result).toBeInstanceOf(Customer); // should be single Customer object
            expect(result.resetPasswordToken).toBe(newMockRowData.resetPasswordToken);
            expect(result.resetPasswordExpires).toBe(newMockRowData.resetPasswordExpires);
            expect(result.customerId).toBe(newMockRowData.customerId);
            expect(mockPool.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT * FROM Customer WHERE resetPasswordToken = ?'),
                [newMockRowData.resetPasswordToken]
            );
        });

        test('returns null when no matching customers found', async () => {
            mockPool.query.mockResolvedValue([[], {metadata: 'unused'}]);

            const result = await findUserByToken('badToken');
            expect(result).toBeNull();
        });

        test('throws an error when query fails', async () => {
            const error = new Error('Query failed');
            mockPool.query.mockRejectedValue(error);

            await expect(findUserByToken('exampleToken')).rejects.toThrow('Query failed');
            expect(consoleErrorSpy).toHaveBeenCalledWith('Database query failed:', error);
        });
    });
});