const mysql = require('mysql2');

// connect server to database
const db = mysql.createConnection(
   {
      host: 'localhost',
      user: 'root',
      password: "13310977375Hu",
      database: 'company',
   }
);

module.exports = db;