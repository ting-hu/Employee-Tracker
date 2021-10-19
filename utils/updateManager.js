const inquirer = require("inquirer");
const db = require("../db/connection");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function managerChoices() {
  const managers = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name FROM manager `;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        managers.push(element.id + ". " + element.name);
      });
      resolve(managers);
    });
  });
}

function editManagerTable(manager_id, manager_name) {
  const sql = `UPDATE manager SET name = ? WHERE id = ?`;
  const params = [manager_name, manager_id];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Manager updated!"));
    promptUser();
  });
}

updateManager = async () => {
  const managerResponse = await inquirer.prompt([
    {
      type: "list",
      name: "selectedManager",
      message: "Which manager would you like to update?",
      choices: await managerChoices(),
    },
    {
      type: "input",
      name: "updatedManager",
      message: "Enter the new managers name: ",
    },
  ]);
  const managerId = managerResponse.selectedManager.charAt(0);
  editManagerTable(managerId, managerResponse.updatedManager);
};

module.exports = { updateManager, managerChoices };
