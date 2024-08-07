import db from './db.js';

const tableName = 'Customer';

class Customer {
  constructor(customerId, username, email, password, hp, resetPasswordToken = null, resetPasswordExpires = null) {
    this.customerId = customerId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.hp = hp;
    this.resetPasswordToken = resetPasswordToken;
    this.resetPasswordExpires = resetPasswordExpires;
  }
}

async function insertCustomer(customer) {
  try {
    const pool = await db.promisedConnectionPool;
    const [result] = await pool.query(
      `
        INSERT INTO ${tableName} (
          username, 
          email, 
          password, 
          hp,
          resetPasswordToken,
          resetPasswordExpires
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customer.username,
        customer.email,
        customer.password,
        customer.hp,
        customer.resetPasswordToken,
        customer.resetPasswordExpires
      ]
    );
    return result.insertId; // return customerId (auto-increment primary key)
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

async function findOneByCustomerId(customerId) {
  try {
    const pool = await db.promisedConnectionPool;
    const [rows] = await pool.query(
      `
        SELECT * FROM ${tableName} WHERE customerId = ?
      `,
      [customerId]
    );

    if (rows.length === 0) {
      return null; // No customer found
    }

    const row = rows[0];
    return new Customer(
      row.customerId,
      row.username,
      row.email,
      row.password,
      row.hp,
      row.resetPasswordToken,
      row.resetPasswordExpires
    );
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

async function findUserByEmail(email) {
  try {
    const pool = await db.promisedConnectionPool;
    const [rows] = await pool.query(
      `
        SELECT * FROM ${tableName} WHERE email = ?
      `,
      [email]
    );

    if (rows.length === 0) {
      return null; // No customer found
    }

    const row = rows[0];
    return new Customer(
      row.customerId,
      row.username,
      row.email,
      row.password,
      row.hp,
      row.resetPasswordToken,
      row.resetPasswordExpires
    );
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}

async function updateUser(customerId, updates) {
  try {
    const pool = await db.promisedConnectionPool;
    const fields = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(customerId);

    const [rows] = await pool.query(`UPDATE ${tableName} SET ${fields} WHERE customerId = ?`, values);

    return rows.affectedRows > 0;
  } catch (error) {
    console.error('Database update failed:', error);
    throw error;
  }
}

async function findUserByToken(token) {
  try {
    const pool = await db.promisedConnectionPool;
    const [rows] = await pool.query(
      `SELECT * FROM ${tableName} WHERE resetPasswordToken = ?`,
      [token]
    );

    if (rows.length === 0) {
      return null; // No customer found
    }

    const row = rows[0];
    return new Customer(
      row.customerId,
      row.username,
      row.email,
      row.password,
      row.hp,
      row.resetPasswordToken,
      row.resetPasswordExpires
    );
  } catch (error) {
    console.error('Database query failed:', error);
    throw error;
  }
}


export { Customer, insertCustomer, findOneByCustomerId, findUserByEmail, updateUser, findUserByToken };
