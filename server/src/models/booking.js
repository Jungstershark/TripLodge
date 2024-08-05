import db from "./db.js";

const tableName = "Booking";

class Booking {
  constructor(
    bookingId,
    status,
    destinationId,
    hotelName,
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
    this.hotelName = hotelName;
    this.hotelId = hotelId;
    this.roomKey = roomKey;
    this.customerId = Number(customerId)===0?null:customerId;
    this.numberOfNights = Number(numberOfNights);
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.numAdults = Number(numAdults);
    this.numChildren = Number(numChildren);
    this.msgToHotel = msgToHotel;
    this.roomTypes = roomTypes;
    this.price = parseFloat(price);
    this.guestSalutation = guestSalutation;
    this.guestFirstName = guestFirstName;
    this.guestLastName = guestLastName;
    this.paymentId = paymentId;
    this.payeeId = payeeId;
  }
}

async function insertBooking(booking) {
  try {
    const pool = await db.promisedConnectionPool;
    const [result] = await pool.query(
      `
        INSERT INTO ${tableName} (
          status,
          destinationId,
          hotelName,
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
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? , ? , ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        booking.status,
        booking.destinationId,
        booking.hotelName,
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
    return result.insertId; // return bookingId (auto-increment primary key)
  } catch (error) {
    console.error("Database connection failed: " + error);
    throw error;
  }
}

async function findBookingByBookingId(bookingId) {
  try {
    const pool = await db.promisedConnectionPool;
    const [rows, fieldDefs] = await pool.query(
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
      row.hotelName,
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

async function findBookingByCustomerId(customerId) {
  try {
    const pool = await db.promisedConnectionPool;
    const [rows, fieldDefs] = await pool.query(
      `
        SELECT * FROM ${tableName} WHERE customerId = ?
      `,
      [customerId]
    );

    if (rows.length === 0) {
      return null; // No booking found
    }

    const bookings = rows.map(row => {
      return new Booking(
        row.bookingId,
        row.status,
        row.destinationId,
        row.hotelName,
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
    });
    return bookings; // array of Booking instances
  } catch (error) {
    console.error("Database query failed: " + error);
    throw error;
  }
}

async function updateBookingStatus(bookingId, newStatus) {
  try {
    const pool = await db.promisedConnectionPool;
    const [result] = await pool.query(
      `
        UPDATE ${tableName} 
        SET status = ?
        WHERE bookingId = ?
      `,
      [newStatus, bookingId]
    );

    if (result.affectedRows === 0) {
      return null; // No booking found to update
    }

    return result; // Return the result of the update operation
  } catch (error) {
    console.error("Database update failed: " + error);
    throw error;
  }
}

async function removeBooking(bookingId) {
  try {
    const pool = await db.promisedConnectionPool;
    const [result] = await pool.query(
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

export { Booking, insertBooking, findBookingByBookingId, findBookingByCustomerId, updateBookingStatus, removeBooking };
