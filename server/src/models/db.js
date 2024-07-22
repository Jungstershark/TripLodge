import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// The port is set to 3300 here, which is where the MySQL container is configured to listen.
// If you have set up the MySQL container correctly, there should be no issue running this script.
// 
// If you encounter issues regarding the port being unavailable, change the port number below AND 
// the port number in `run_mysql.sh`.
//
// In lines 43 and 50 of `run_mysql.sh`:
// Change 'docker run --name $CONTAINER_NAME -p 3300:3306 -d $IMAGE_NAME:latest'
// To 'docker run --name $CONTAINER_NAME -p [ANOTHER_PORT_NUMBER]:3306 -d $IMAGE_NAME:latest'
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3300,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
}).promise();

const cleanup = async () => {
  try {
    await pool.end();
  } catch (err) {
    console.error('Error closing the database connection pool:', err);
  }
};

export default { pool, cleanup };
