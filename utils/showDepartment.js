const init = require("../app");
const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

//show all department information from departments table in db
function showAllDep() {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table("Departments:", rows);
    promptUser();
  });
}

module.exports = showAllDep;
