import db from "./db.js";

const tableName = "Customer";

class Customer {
  constructor(customerId, username, email, password, hp) {
    this.customerId = customerId,
    this.username = username,
    this.email = email,
    this.password = password,
    this.hp = hp
   }
}

async function insertCustomer(customer){
    try {
      const pool = await db.promisedConnectionPool;
      const [rows, fieldDefs] = await pool.query(
        `
          INSERT INTO ${tableName} (
            customerId, 
            username, 
            email, 
            password, 
            hp
          ) VALUES (?, ?, ?, ?, ?)
        `,
        [
          customer.customerId,
          customer.username,
          customer.email,
          customer.password,
          customer.hp
        ]
      );
    } catch (error) {
      console.error("Database connection failed: " + error);
      throw error;
    }
}

async function findOneByCustomerId(){
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
      let customer = new Customer(
          row.customerId,
          row.username,
          row.email,
          row.password,
          row.hp
      );
      return customer;
    } catch (error) {
      console.error("Database query failed: " + error);
      throw error;
    }
}

export {Customer, insertCustomer, findOneByCustomerId}