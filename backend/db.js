require('dotenv').config()
const { Pool } = require('pg')

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';
let DB_HOST
if (process.env.NODE_ENV === 'production') {
  DB_HOST = `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`
} else {
  DB_HOST = process.env.DB_IP
}

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
})

module.exports = pool
