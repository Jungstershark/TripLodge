// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config(); // allows us to use process.env to access environment variables

// // Convert the module URL to a file path
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const sqlConfig = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   connectionLimit: 10,
// }

// const promisedConnectionPool = new Promise((resolve, reject) => {
//   const initDb = async () => {
//     try {
//       // Connect to mysql server
//       const connection = await mysql.createConnection(sqlConfig);
  
//       // Create database if it does not exist
//       await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
//       await connection.end();
//       sqlConfig.database = process.env.DB_NAME;
  
//       // Initialize connection pool
//       const pool = mysql.createPool(sqlConfig);
      
//       // Run rest of database initialization logic (init.sql)
//       const initSqlPath = path.join(__dirname, 'init.sql');
//       const sql = fs.readFileSync(initSqlPath, 'utf-8');
//       const statements = sql.split(';');
  
//       for (let statement of statements) {
//         if (statement.trim()) {
//           await pool.query(statement);
//         }
//       }
//       console.log('Database initialized successfully.');
//       resolve(pool);

//     } catch (err) {
//       console.error('Error initializing database:', err);
//     }
//   };

//   return initDb();
// });

// const cleanup = async () => {
//   try {
//     const pool = await promisedConnectionPool;
//     await pool.end();
//   } catch (err) {
//     console.error('Error closing the database connection pool:', err);
//   }
// };

// export default {promisedConnectionPool, cleanup}

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); // allows us to use process.env to access environment variables

// Verify environment variables
console.log('Database credentials:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sqlConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
}

const promisedConnectionPool = new Promise((resolve, reject) => {
  const initDb = async () => {
    try {
      // Connect to mysql server
      const connection = await mysql.createConnection(sqlConfig);
  
      // Create database if it does not exist
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
      await connection.end();
      sqlConfig.database = process.env.DB_NAME;
  
      // Initialize connection pool
      const pool = mysql.createPool(sqlConfig);
      
      // Run rest of database initialization logic (init.sql)
      const initSqlPath = path.join(__dirname, 'init.sql');
      const sql = fs.readFileSync(initSqlPath, 'utf-8');
      const statements = sql.split(';');
  
      for (let statement of statements) {
        if (statement.trim()) {
          await pool.query(statement);
        }
      }
      console.log('Database initialized successfully.');
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
    await pool.end();
  } catch (err) {
    console.error('Error closing the database connection pool:', err);
  }
};

export default {promisedConnectionPool, cleanup}
