const init = require("../app");
const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

function showDep() {
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

module.exports = showDep;
