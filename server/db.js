const dotenv = require('dotenv');
dotenv.config();

const Pool = require("pg").Pool;
const USER = process.env.USER2;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: "localhost",
  port: PORT,
  database: DATABASE,
});

module.exports = pool;