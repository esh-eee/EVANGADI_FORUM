const mysql2 = require("mysql2");
 const fs = require("fs");
 const path = require("path");

const sslCert = fs.readFileSync(path.resolve(__dirname, "certificate.pem"));


// use to connect backend code with the specefic database
const dbconnection = mysql2.createPool({
  user: process.env.USER,
  port: process.env.PORT,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: 10,
  ssl: {
    ca: sslCert,
  },
});

// dbconnection.execute("select 'test' ", (err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });
module.exports= dbconnection.promise()


