const db = require("../db/connection");
const inquirer = require("inquirer");
const { managerChoices } = require("./updateManager");
const prompts = require("../app");
const mysql = require("mysql2");

function showEmpByMan(manager) {
  const sql = `SELECT employee.first_name, employee.last_name FROM employee WHERE manager_id = ?`;
  const params = manager;
  db.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    promptUser();
  });
}

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
