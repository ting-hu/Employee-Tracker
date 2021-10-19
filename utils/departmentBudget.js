const { departmentChoices } = require("./addRole");
const inquirer = require("inquirer");
const db = require("../db/connection");
const chalk = require("chalk");
const prompts = require("../app");
const mysql = require("mysql2");

function calculateBudget(departmentId) {
  const sql = `SELECT SUM(salary) FROM roles WHERE department_id = ?;`;
  const params = departmentId;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    let response = JSON.parse(JSON.stringify(result));
    console.log(
      chalk.green("Department Budget: " + response[0]["SUM(salary)"])
    );
    promptUser();
  });
}

showDepartmentBudget = async () => {
  const response = await inquirer.prompt({
    type: "list",
    name: "depSelected",
    message: "Select the department to view department budget",
    choices: await departmentChoices(),
  });
  const departmentId = response.depSelected.charAt(0);
  calculateBudget(departmentId);
};

module.exports = showDepartmentBudget;
