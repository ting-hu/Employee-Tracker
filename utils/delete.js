const inquirer = require("inquirer");
const db = require("../db/connection");
const { departmentChoices } = require("./addRole");
const { roleChoices } = require("./updateEmployee");
const { employeeChoices } = require("./updateEmployee");
const showEmployees = require("./showEmployees");
const init = require("../app");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function deleteFromDepartmentTable(departmentId) {
  const sql = `DELETE FROM department WHERE id = ?`;
  const params = departmentId;
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

function deleteFromEmployeeTable(empl) {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = empl;
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
  const dept = data.department.charAt(0);
  deleteFromDepartmentTable(dept);
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
    name: "employees",
    message: "Select the employee you wish to delete from the database.",
    choices: await employeeChoices(),
  });
  const empl = data.employees.charAt(0);
  deleteFromEmployeeTable(empl);
};

module.exports = { deleteDepartment, deleteRole, deleteEmployee };
