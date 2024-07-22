import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
});

const initDb = async () => {
  try {
    const initSqlPath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(initSqlPath, 'utf-8');
    const statements = sql.split(';');

    for (let statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

const cleanup = async () => {
  try {
    await pool.end();
  } catch (err) {
    console.error('Error closing the database connection pool:', err);
  }
};

initDb();

export default {pool, cleanup}