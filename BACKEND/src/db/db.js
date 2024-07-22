require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "db_user",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "sugarcove",
});

module.exports = pool;
