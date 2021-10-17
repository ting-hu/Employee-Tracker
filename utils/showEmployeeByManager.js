const db = require("../db/connection");
const inquirer = require("inquirer");
const { managerChoices } = require("./updateManager");
const prompts = require("../app");
const mysql = require("mysql2");

//sql commands to display the employee table filtered by manager
function showEmpByMan(manager) {
  const sql = `SELECT employees.first_name, employees.last_name FROM employees WHERE manager_id = ?`;
  const params = manager;
  db.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    promptUser();
  });
}

//get user input on which manager we will be using to filter out employees
viewEmpByMan = async () => {
  const userInput = await inquirer.prompt({
    type: "list",
    name: "manager",
    message: "Select the manager whose employees you'd like to view.",
    choices: await managerChoices(),
  });
  const managerId = userInput.manager.charAt(0);
  showEmpByMan(managerId);
};

module.exports = viewEmpByMan;
