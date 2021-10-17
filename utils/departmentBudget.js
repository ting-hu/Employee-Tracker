const { departmentChoices } = require("./addRole");
const inquirer = require("inquirer");
const db = require("../db/connection");
const chalk = require("chalk");
const prompts = require("../app");
const mysql = require("mysql2");

//calculate the budget using SQL commands
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
//get department budget prompts users to select the department we will be summing to get department budget
getDepBudget = async () => {
  const resp = await inquirer.prompt({
    type: "list",
    name: "depSelected",
    message: "Select the department to view department budget",
    choices: await departmentChoices(),
  });
  //get department id to correlate with roles table that shows salary for the calculate budget function
  const depId = resp.depSelected.charAt(0);
  calculateBudget(depId);
};

module.exports = getDepBudget;
