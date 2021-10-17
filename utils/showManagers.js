const db = require("../db/connection");
const updateManager = require("./updateManager");
const mysql = require("mysql2");

//show all managers function
function showAllManagers() {
  const sql = `SELECT * FROM managers`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Departments:", rows);
  });
}

module.exports = showAllManagers;
