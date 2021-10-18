const inquirer = require("inquirer");
const db = require("../db/connection");
const showAllManagers = require("./showManagers");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

//get manager array as choices in inquirer prompts that prompt to update manager table or view employees by manager
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

// takes user input from inquirer prompt to update managers table in db
function editManagerTable(id, name) {
  const sql = `UPDATE manager SET name = ? WHERE id = ?`;
  const params = [name, id];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Manager updated!"));
    // showAllManagers();
    promptUser();
  });
}

//get user input to update manager table
updateManager = async () => {
  const managerRes = await inquirer.prompt([
    {
      type: "list",
      name: "selectedMan",
      message: "Which manager would you like to update?",
      choices: await managerChoices(),
    },
    {
      type: "input",
      name: "updatedMan",
      message: "Enter the new managers name: ",
    },
  ]);
  const manId = managerRes.selectedMan.charAt(0);
  editManagerTable(manId, managerRes.updatedMan);
};

module.exports = { updateManager, managerChoices };
