require('dotenv').config()
const { Pool } = require('pg')

let DB_HOST
if (process.env.NODE_ENV === 'production') {
  DB_HOST = process.env.DB_HOST
} else if (process.env.NODE_ENV === 'local') {
  DB_HOST = process.env.DB_IP
} else {
  throw Error('DB_HOST is not working')
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
