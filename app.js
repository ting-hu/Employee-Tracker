const inquirer = require("inquirer");
const chalk = require("chalk");
const mysql = require("mysql2");
const consoleTable = require("console.table");
const db = require("./db/connection");

const showDep = require("./utils/showDepartment");
const showRoles = require("./utils/showRoles");
const showEmployees = require("./utils/showEmployees");
const addDepartment = require("./utils/addDepartment");
const { addRole } = require("./utils/addRole");
const { addEmployee } = require("./utils/addEmployee");
const { updateEmployee } = require("./utils/updateEmployee");
const { updateManager } = require("./utils/updateManager");
const viewEmployeeByManager = require("./utils/showEmployeeByManager");
const viewEmployeeByDepartment = require("./utils/showEmpolyeeByDepartment");
const {
  deleteDepartment,
  deleteRole,
  deleteEmployee,
} = require("./utils/delete");
const showDepartmentBudget = require("./utils/departmentBudget");

function init() {
  console.log(chalk.cyan(`--------------- Program starts ---------------`));
  promptUser();
}

module.exports = promptUser = async () => {
  const data = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee",
      "Update employee manager",
      "View employees by manager",
      "View employees by department",
      "Delete department",
      "Delete role",
      "Delete employee",
      "View department budget",
      "Exit app",
    ],
  });

  switch (data.action) {
    case "View all departments":
      showDep();
      break;
    case "View all roles":
      showRoles();
      break;
    case "View all employees":
      showEmployees();
      break;
    case "Add a department":
      addDepartment();
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update an employee":
      updateEmployee();
      break;
    case "Update employee manager":
      updateManager();
      break;
    case "View employees by manager":
      viewEmployeeByManager();
      break;
    case "View employees by department":
      viewEmployeeByDepartment();
      break;
    case "Delete department":
      deleteDepartment();
      break;
    case "Delete role":
      deleteRole();
      break;
    case "Delete employee":
      deleteEmployee();
      break;
    case "View department budget":
      showDepartmentBudget();
      break;
    case "Exit app":
      console.log(chalk.cyan(`--------------- Program ends ---------------`));
      db.end();
      break;
  }
};

init();
