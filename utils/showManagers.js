const db = require("../db/connection");
const updateManager = require("./updateManager");
const mysql = require("mysql2");

function showManagers() {
  const sql = `SELECT * FROM manager`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Departments:", rows);
  });
}

module.exports = showManagers;
