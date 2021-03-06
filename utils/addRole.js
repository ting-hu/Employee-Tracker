const db = require("../db/connection");
const inquirer = require("inquirer");
const promise = require("mysql2/promise");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function departmentChoices() {
  const departments = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name FROM department`;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        departments.push(element.id + ". " + element.name);
      });
      resolve(departments);
    });
  });
}

addToRolesTable = async (title, salary, depId) => {
  const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
  const params = [title, salary, depId];
  db.query(sql, params, (err, result) => {
    if (err) throw err;
    console.log(chalk.green("Role added to roles table."));
    promptUser();
  });
};

addRole = async () => {
  const roleRes = await inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "Enter the title of the role to add: ",
    },
    {
      type: "input",
      name: "roleSalary",
      message: "Enter the salary for this role: ",
    },
    {
      type: "list",
      name: "roleDep",
      message: "Which department would you like to add this role to?",
      choices: await departmentChoices(),
    },
  ]);
  const depId = roleRes.roleDep.charAt(0);
  addToRolesTable(roleRes.roleTitle, roleRes.roleSalary, depId);
};

module.exports = { addRole, departmentChoices };
