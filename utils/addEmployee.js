const db = require("../db/connection");
const inquirer = require("inquirer");
const promise = require("mysql2/promise");
const { departmentChoices } = require("./addRole");
const showAllEmployees = require("./showEmployees");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

//get role choices for inquirer prompt function
function roleChoices() {
  const roles = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT title, id FROM roles`;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      //parse the json object to enable the forEach method to get the role id and role title as options
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        roles.push(element.id + ". " + element.title);
      });
      //return the new roles array
      resolve(roles);
    });
  });
}

//get manager array for inquirer prompt choices
function managerChoices() {
  const managers = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, manager_name FROM managers`;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      //parse the JSON object to work with it
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        managers.push(element.id + ". " + element.manager_name);
      });
      //return the new managers array
      resolve(managers);
    });
  });
}

//update the employees table in the database, taking user input and using it as params
function addToEmpTable(first, last, role, manager, department) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id, dep_id) VALUES (?, ?, ?, ?, ?)`;
  const params = [first, last, role, manager, department];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(chalk.green(first + " " + last + " added to employees table."));
    // showAllEmployees();
    promptUser();
  });
}

//add Employee function to prompt user for input to use in addToEmpTable function
addEmployee = async () => {
  const employeeRes = await inquirer.prompt([
    {
      type: "input",
      name: "empFirst",
      message: "Enter the first name of the employee to add: ",
    },
    {
      type: "input",
      name: "empLast",
      message: "Enter the last name of the employee to add: ",
    },
    {
      type: "list",
      name: "empRole",
      message: "Select the role for this employee.",
      choices: await roleChoices(),
    },
    {
      type: "list",
      name: "empManager",
      message: "Enter the manager to whom this employee will report to.",
      choices: await managerChoices(),
    },
    {
      type: "list",
      name: "empDep",
      message: "Which department does this employee work within?",
      choices: await departmentChoices(),
    },
  ]);
  //get the id to seed the table correctly so use charAt index 0 to grab just the id provided in the choices (1. option1)
  const roleId = employeeRes.empRole.charAt(0);
  const managerId = employeeRes.empManager.charAt(0);
  const depId = employeeRes.empDep.charAt(0);
  //take user input and use it as params in the addToEmpTable function
  addToEmpTable(
    employeeRes.empFirst,
    employeeRes.empLast,
    roleId,
    managerId,
    depId
  );
};

module.exports = { addEmployee, roleChoices };
