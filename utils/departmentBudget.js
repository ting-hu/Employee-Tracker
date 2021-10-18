const { departmentChoices } = require("./addRole");
const inquirer = require("inquirer");
const db = require("../db/connection");
const chalk = require("chalk");
const prompts = require("../app");
const mysql = require("mysql2");

function calculateBudget(depId) {
  const sql = `SELECT SUM(salary) FROM roles WHERE department_id = ?;`;
  const params = depId;
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

getDepBudget = async () => {
  const resp = await inquirer.prompt({
    type: "list",
    name: "depSelected",
    message: "Select the department to view department budget",
    choices: await departmentChoices(),
  });
  const depId = resp.depSelected.charAt(0);
  calculateBudget(depId);
};

module.exports = getDepBudget;
