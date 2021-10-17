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

//delete from the db table departments
function deleteFromDepTable(depId) {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = depId;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Department deleted."));
    // showAllDep();
    promptUser();
  });
}

//delete from the db table roles
function deleteFromRolesTable(roleId) {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = roleId;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Role deleted."));
    // showAllRoles();
    promptUser();
  });
}

//delete from the db table employees
function deleteFromEmployeeTable(employee) {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = employee;
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(chalk.green("Employee deleted."));
    // showAllEmployees();
    promptUser();
  });
}

//delete department that takes user input on which param to use in the deleteFromDepTable function
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

//delete role that takes user input on which param to use in the deleteFromRolesTable function
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

//delete employee that takes user input on which param to use in the deleteFromEmpTable function
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
