const mysql2 = require("mysql2");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const sslCert = fs.readFileSync(path.resolve(__dirname, "certificate.pem"));

const dbconnection = mysql2.createPool({
  user: process.env.USER,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: 10,
  ssl: {
    ca: sslCert,
  },
});

module.exports = dbconnection.promise();
