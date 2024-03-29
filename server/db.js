require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "darcy0728",
  host: "localhost",
  port: 5432,
  database: "permalist",
});

module.exports = pool;