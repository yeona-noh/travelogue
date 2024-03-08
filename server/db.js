require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: "localhost",
  port: process.env.PORT,
  database: process.env.DATABASE,
});

module.exports = pool;