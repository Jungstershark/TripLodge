-- Drop existing tables if they exist
DROP TABLE IF EXISTS Booking;
DROP TABLE IF EXISTS Customer;


-- Create the Customer table
CREATE TABLE Customer (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    hp VARCHAR(50) NOT NULL
);

-- Create the Booking table
CREATE TABLE Booking (
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(50),
    destinationID VARCHAR(50),
    hotelID VARCHAR(50),
    roomKey VARCHAR(255),
    customerID INT,
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
    paymentID INT,
    payeeID INT,
    FOREIGN KEY (customerID) REFERENCES Customer(customerId)
);

-- Insert sample data into the Customer table
INSERT INTO Customer (username, email, password, hp) VALUES
('alice_wonder', 'alice@example.com', 'password123', '555-0001'),
('bob_builder', 'bob@example.com', 'password456', '555-0002'),
('carol_jones', 'carol@example.com', 'password789', '555-0003');

-- Insert sample data into the Booking table
INSERT INTO Booking (status, destinationID, hotelID, roomKey, customerID, numberOfNights, startDate, endDate, numAdults, numChildren, msgToHotel, roomTypes, price, guestSalutation, guestFirstName, guestLastName, paymentID, payeeID) VALUES
('confirmed', 'WD0M', 'diH7', 'er-D4BA4388A2DE0E55F420A507ADAC2D99-A1951C279575DC3CD79C0B549A2A27E9', 1, 6, '2024-10-01', '2024-10-07', 1, 1, 'Please provide a crib.', 'suite', 450.00, 'Ms.', 'Alice', 'Wonder', 1001, 2001),
('canceled', 'WD0M', 'h3z1', 'er-3ED1467FB02847986F4C32BAFA23332A-119D46B2FD3AC7A8D41C84C60A83A304', 2, 5, '2024-10-11', '2024-10-16', 2, 1, 'Late check-in preferred.', 'suite', 600.00, 'Mr.', 'Bob', 'Builder', 1002, 2002),
('confirmed', 'YAXB', 'e7Gy', '180B82538EEAB16EA2D8A89733D2E185', 3, 3, '2024-10-01', '2024-10-04', 1, 0, 'Allergies to peanuts.', 'standard', 200.00, 'Ms.', 'Carol', 'Jones', 1003, 2003);
