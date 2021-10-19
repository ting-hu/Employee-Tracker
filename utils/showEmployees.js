const db = require("../db/connection");
const prompts = require("../app");
const mysql = require("mysql2");

showEmployees = async () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, 

    roles.title AS title,

    manager.name AS manager, 

    department.name AS department,

    roles.salary AS salary
    
    FROM employee

    LEFT JOIN roles
    ON employee.role_id = roles.id

    LEFT JOIN manager
    ON employee.manager_id = manager.id

    LEFT JOIN department
    ON employee.dept_id = department.id;`;

  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table("Employees:", rows);
    promptUser();
  });
};

module.exports = showEmployees;
