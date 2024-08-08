// dbTest is meant to create a db connection pool meant for testing (separate from the actual implemented db script)
// This is because the actual implemented db has some issues with jest when imported into testing due to some conflicts

import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config(); 

const testTableName = "TestBooking"; // Table name for testing booking

const promisedConnectionPool = new Promise((resolve, reject) => {
    const initDb = async () => {
        const sqlConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionLimit: 10,
        }
    
        try {
            // Connect to mysql server
            const connection = await mysql.createConnection(sqlConfig);
            // Create database if it does not exist
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
            await connection.end();
            sqlConfig.database = process.env.DB_NAME;
        
            // Initialize connection pool
            const pool = mysql.createPool(sqlConfig);
    
            // Initialize booking table for testing:
            // 1) Delete existing test booking table
            await pool.query(`
                DROP TABLE IF EXISTS ${testTableName};
            `);
    
            // 2) Recreate test booking table
            await pool.query(`
                CREATE TABLE ${testTableName} (
                    bookingId INT AUTO_INCREMENT PRIMARY KEY,
                    status VARCHAR(50),
                    destinationId VARCHAR(255),
                    hotelName VARCHAR(255),
                    hotelId VARCHAR(255),
                    roomKey VARCHAR(255),
                    customerId INT,
                    numberOfNights INT,
                    startDate DATE,
                    endDate DATE,
                    numAdults INT,
                    numChildren INT,
                    msgToHotel TEXT,
                    roomTypes TEXT,
                    price DECIMAL(10, 2),
                    guestSalutation VARCHAR(50),
                    guestFirstName VARCHAR(255),
                    guestLastName VARCHAR(255),
                    paymentId VARCHAR(255),
                    payeeId VARCHAR(255),
                    FOREIGN KEY (customerId) REFERENCES Customer(customerId)
                );`
            );
    
            // 3) Insert dummy entries
            await pool.query(`
                INSERT INTO ${testTableName} (status, destinationId, hotelName, hotelId, roomKey, customerId, numberOfNights, startDate, endDate, numAdults, numChildren, msgToHotel, roomTypes, price, guestSalutation, guestFirstName, guestLastName, paymentId, payeeId) VALUES
                ('confirmed', 'WD0M', 'Test Hotel 1', 'diH7', 'er-D4BA4388A2DE0E55F420A507ADAC2D99-A1951C279575DC3CD79C0B549A2A27E9', 1, 6, '2024-10-01', '2024-10-07', 1, 1, 'Please provide a crib.', 'suite', 450.00, 'Ms.', 'Alice', 'Wonder', 1001, 2001),
                ('canceled', 'WD0M', 'Test Hotel 2', 'h3z1', 'er-3ED1467FB02847986F4C32BAFA23332A-119D46B2FD3AC7A8D41C84C60A83A304', 2, 5, '2024-10-11', '2024-10-16', 2, 1, 'Late check-in preferred.', 'suite', 600.00, 'Mr.', 'Bob', 'Builder', 1002, 2002),
                ('confirmed', 'YAXB', 'Test Hotel 3', 'e7Gy', '180B82538EEAB16EA2D8A89733D2E185', 3, 3, '2024-10-01', '2024-10-04', 1, 0, 'Allergies to peanuts.', 'standard', 200.00, 'Ms.', 'Carol', 'Jones', 1003, 2003);
            `);
    
            console.log(`Test booking table ${testTableName} initialized.`)
            resolve(pool);
        } catch (err) {
            console.error('Error initializing database:', err);
        }
    };
    return initDb();
  });
  
const cleanup = async () => {
    try {
        const pool = await promisedConnectionPool;
        // Delete test table
        await pool.query(`
            DROP TABLE IF EXISTS ${testTableName};
        `);
        await pool.end();
    } catch (err) {
        console.error('Error closing the database connection pool:', err);
    }
};


export default { promisedConnectionPool, cleanup, testTableName };