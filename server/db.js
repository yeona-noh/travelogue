const dotenv = require('dotenv');
dotenv.config();

// const Pool = require("pg").Pool;
// const USER = process.env.USER2;
// const PASSWORD = process.env.PASSWORD;
// const PORT = process.env.PORT;
// const DATABASE = process.env.DATABASE;

// const pool = new Pool({
//   user: USER,
//   password: PASSWORD,
//   host: "localhost",
//   port: PORT,
//   database: DATABASE,
// });

// module.exports = pool;

const dotenv = require('dotenv');
dotenv.config();

const { Pool } = require("pg");

// Use DATABASE_URL on Heroku, otherwise fall back to local connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || `postgresql://${process.env.USER2}:${process.env.PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DATABASE}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
