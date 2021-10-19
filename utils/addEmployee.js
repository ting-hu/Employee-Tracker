const db = require("../db/connection");
const inquirer = require("inquirer");
const promise = require("mysql2/promise");
const chalk = require("chalk");
const mysql = require("mysql2");
const { departmentChoices } = require("./addRole");
const prompts = require("../app");

function roleChoices() {
  const roles = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT title, id FROM roles`;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        roles.push(element.id + ". " + element.title);
      });
      resolve(roles);
    });
  });
}

function managerChoices() {
  const managers = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name FROM manager`;
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

function addToEmpolyeeTable(
  first_name,
  last_name,
  role_id,
  manager_id,
  department_id
) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id, dept_id) VALUES (?, ?, ?, ?, ?)`;
  const params = [first_name, last_name, role_id, manager_id, department_id];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      chalk.green(first_name + " " + last_name + " added to employees table.")
    );
    promptUser();
  });
}

addEmployee = async () => {
  const employeeResponse = await inquirer.prompt([
    {
      type: "input",
      name: "employeeFirst",
      message: "Enter the first name of the employee to add: ",
    },
    {
      type: "input",
      name: "employeeLast",
      message: "Enter the last name of the employee to add: ",
    },
    {
      type: "list",
      name: "employeeRole",
      message: "Select the role for this employee.",
      choices: await roleChoices(),
    },
    {
      type: "list",
      name: "employeeManager",
      message: "Enter the manager to whom this employee will report to.",
      choices: await managerChoices(),
    },
    {
      type: "list",
      name: "employeeDep",
      message: "Which department does this employee work within?",
      choices: await departmentChoices(),
    },
  ]);
  const roleId = employeeResponse.employeeRole.charAt(0);
  const managerId = employeeResponse.employeeManager.charAt(0);
  const depId = employeeResponse.employeeDep.charAt(0);
  addToEmpolyeeTable(
    employeeResponse.employeeFirst,
    employeeResponse.employeeLast,
    roleId,
    managerId,
    depId
  );
};

module.exports = { addEmployee, roleChoices };
