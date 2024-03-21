require('dotenv').config();
const { Pool } = require('pg');

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

let pool;
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    // Remove port and SSL when connecting through Unix socket
  });
} else {
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_IP,
    port: process.env.DB_PORT, // Specify the port if needed for local development
    // SSL configuration for local development if needed
  });
}

module.exports = pool;