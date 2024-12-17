const dotenv = require('dotenv');
dotenv.config();

const Pool = require("pg").Pool;
const USER = process.env.USER2;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;
const DATABASE = process.env.DATABASE;
const HOST = process.env.HOST;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: PORT,
  database: DATABASE,
  ssl: {
    rejectUnauthorized: false
}
});


module.exports = pool;


