const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

//show all roles function using sql commands
function showAllRoles() {
  const sql = `SELECT * FROM roles`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Roles:", rows);
    promptUser();
  });
}

module.exports = showAllRoles;
