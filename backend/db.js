require('dotenv').config()
const { Pool } = require('pg')

if (process.env.NODE_ENV === 'production') {
  DB_HOST = process.env.DB_HOST
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
