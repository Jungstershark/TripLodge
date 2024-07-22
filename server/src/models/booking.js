import db from "./db.js";

const tableName = "Booking";

class Booking {
  constructor(
    bookingId,
    status,
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
    payeeId
  ) {
    this.bookingId = bookingId;
    this.status = status;
    this.destinationId = destinationId;
    this.hotelId = hotelId;
    this.roomKey = roomKey;
    this.customerId = customerId;
    this.numberOfNights = numberOfNights;
    this.startDate = startDate;
    this.endDate = endDate;
    this.numAdults = numAdults;
    this.numChildren = numChildren;
    this.msgToHotel = msgToHotel;
    this.roomTypes = roomTypes;
    this.price = price;
    this.guestSalutation = guestSalutation;
    this.guestFirstName = guestFirstName;
    this.guestLastName = guestLastName;
    this.paymentId = paymentId;
    this.payeeId = payeeId;
  }
}

async function sync() {
  try {
    await db.pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        bookingId INT AUTO_INCREMENT PRIMARY KEY,
        status VARCHAR(50),
        destinationId VARCHAR(50),
        hotelId VARCHAR(50),
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
        paymentId INT,
        payeeId INT,
        FOREIGN KEY (customerId) REFERENCES Customer(customerId)
      )
    `);
  } catch (error) {
    console.error("Database connection failed: " + error);
    throw error;
  }
}

async function insertBooking(booking) {
  try {
    const [rows, fieldDefs] = await db.pool.query(
      `
        INSERT INTO ${tableName} (
          status,
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
          payeeId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        booking.status,
        booking.destinationId,
        booking.hotelId,
        booking.roomKey,
        booking.customerId,
        booking.numberOfNights,
        booking.startDate,
        booking.endDate,
        booking.numAdults,
        booking.numChildren,
        booking.msgToHotel,
        booking.roomTypes,
        booking.price,
        booking.guestSalutation,
        booking.guestFirstName,
        booking.guestLastName,
        booking.paymentId,
        booking.payeeId,
      ]
    );
  } catch (error) {
    console.error("Database connection failed: " + error);
    throw error;
  }
}

async function findOneByBookingId(bookingId) {
  try {
    const [rows, fieldDefs] = await db.pool.query(
      `
        SELECT * FROM ${tableName} WHERE bookingId = ?
      `,
      [bookingId]
    );

    if (rows.length === 0) {
      return null; // No booking found
    }

    const row = rows[0];
    let booking = new Booking(
      row.bookingId,
      row.status,
      row.destinationId,
      row.hotelId,
      row.roomKey,
      row.customerId,
      row.numberOfNights,
      row.startDate,
      row.endDate,
      row.numAdults,
      row.numChildren,
      row.msgToHotel,
      row.roomTypes,
      row.price,
      row.guestSalutation,
      row.guestFirstName,
      row.guestLastName,
      row.paymentId,
      row.payeeId
    );
    return booking;
  } catch (error) {
    console.error("Database query failed: " + error);
    throw error;
  }
}

async function removeBooking(bookingId) {
  try {
    const [result] = await db.pool.query(
      `
        DELETE FROM ${tableName} WHERE bookingId = ?
      `,
      [bookingId]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Booking with ID ${bookingId} does not exist.`);
    }

    console.log(`Booking with ID ${bookingId} has been removed.`);
    return result;
  } catch (error) {
    console.error("Failed to remove booking: " + error);
    throw error;
  }
}

export { Booking, sync, insertBooking, findOneByBookingId, removeBooking };
