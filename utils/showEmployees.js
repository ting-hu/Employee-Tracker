const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

//show all employees function using sql commands
showAllEmployees = async () => {
  const sql = `SELECT * FROM employee;`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table("Employees:", rows);
    promptUser();
  });
};

module.exports = showAllEmployees;
