const db = require("../db/connection");
const inquirer = require("inquirer");
const { departmentChoices } = require("./addRole");
const prompts = require("../app");
const mysql = require("mysql2");

function showEmployeeByDepartment(department) {
  const sql = `SELECT employee.first_name, employee.last_name FROM employee WHERE dept_id = ?`;
  const params = department;
  db.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    promptUser();
  });
}

viewEmployeeByDepartment = async () => {
  const userChoice = await inquirer.prompt({
    type: "list",
    name: "department",
    message: "Select the department to view employees within that department.",
    choices: await departmentChoices(),
  });
  const departmentId = userChoice.department.charAt(0);
  showEmployeeByDepartment(departmentId);
};

module.exports = viewEmployeeByDepartment;
