const db = require('mysql');
require('dotenv').config();

const connection = db.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB
});
connection.connect();
module.exports = connection;