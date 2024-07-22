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

async function sync() {
    try {
      await db.pool.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
            customerId INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            hp VARCHAR(50) NOT NULL
        )
      `);
    } catch (error) {
      console.error("Database connection failed: " + error);
      throw error;
    }
}

async function insertCustomer(customer){
    try {
        const [rows, fieldDefs] = await db.pool.query(
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