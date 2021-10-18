const inquirer = require("inquirer");
const db = require("../db/connection");
// const { managerChoices } = require('./updateManager');
const { departmentChoices } = require("./addRole");
const showAllDep = require("./showDepartment");
const showAllRoles = require("./showRoles");
const { roleChoices } = require("./updateEmployee");
const { employeeChoices } = require("./updateEmployee");
//const { employeeChoices } = require("./updateEmployee");
const showAllEmployees = require("./showEmployees");
const init = require("../app");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function deleteFromDepTable(depId) {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = depId;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Department deleted."));
    promptUser();
  });
}

function deleteFromRolesTable(roleId) {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = roleId;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Role deleted."));
    promptUser();
  });
}

function deleteFromEmployeeTable(employee) {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = employee;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Employee deleted."));
    promptUser();
  });
}

deleteDepartment = async () => {
  const data = await inquirer.prompt({
    type: "list",
    name: "department",
    message: "Select the department you wish to delete.",
    choices: await departmentChoices(),
  });
  const dep = data.department.charAt(0);
  deleteFromDepTable(dep);
};

deleteRole = async () => {
  const data = await inquirer.prompt({
    type: "list",
    name: "role",
    message: "Select the role you wish to delete.",
    choices: await roleChoices(),
  });
  const role = data.role.charAt(0);
  deleteFromRolesTable(role);
};

deleteEmployee = async () => {
  const data = await inquirer.prompt({
    type: "list",
    name: "emp",
    message: "Select the employee you wish to delete from the database.",
    choices: await employeeChoices(),
  });
  const employee = data.emp.charAt(0);
  deleteFromEmployeeTable(employee);
};

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
