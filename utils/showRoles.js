const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

//show all roles function using sql commands
function showAllRoles() {
  const sql = `SELECT roles.title, roles.id, roles.salary,

    department.name AS department

    FROM roles
    LEFT JOIN department
    ON roles.department_id = department.id;`;

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
