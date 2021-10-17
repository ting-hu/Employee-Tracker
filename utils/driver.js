const inquirer = require("inquirer");
const db = require("../db/connection");
const adds = require("./adds");
const delets = require("./deletes");
const gets = require("./gets");
const update = require("./update");
let departments = [];
let employees = [];
let roles = [];

addDepartmentPrompt = async () => {
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "department",
      message: `What is the name of the new department?`,
    },
  ]);
  adds.addDepartment(department.department);
};

addEmployeePrompt = async () => {
  const employee = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: `What is the new employee's first name?`,
    },
    {
      type: "input",
      name: "lastName",
      message: `What is the new employee's last name?`,
    },
    {
      type: "list",
      name: "role",
      message: `What is the new employee's role?`,
      choices: await gets.getRoles(),
    },
    {
      type: "list",
      name: "manager",
      message: `Who is the new employee's manager?`,
      choices: await gets.getManagers(),
    },
    {
      type: "list",
      name: "department",
      message: `What is the new employee's department?`,
      choices: await gets.getDepartments(),
    },
  ]);
  adds.addEmployee(
    employee.firstName,
    employee.lastName,
    employee.role.charAt(0),
    employee.manager.charAt(0),
    employee.department.charAt(0)
  );
};

addRolePrompt = async () => {
  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: `What is the title of the new role?`,
    },
    {
      type: "list",
      name: "department",
      message: `Which department does the role belong to?`,
      choices: await gets.getDepartments(),
    },
    {
      type: "input",
      name: "salary",
      message: `What is the salary?`,
    },
  ]);
  // convert user choice to id integer to fit data fields
  role.department = role.department.charAt(0);
  adds.addRole(role.title, role.department, role.salary);
};

removeDepartmentPrompt = () => {
  db.query(`SELECT * FROM departments`, async function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    resObjArr = JSON.parse(JSON.stringify(res));

    for (res of resObjArr) {
      departments.push(res.name);
    }

    const department = await inquirer.prompt([
      {
        type: "list",
        name: "department",
        message: `Which department would you like to remove?`,
        choices: departments,
      },
    ]);
    adds.deleteDepartment(department.department);
  });
};

removeEmployeePrompt = () => {
  db.query(
    `SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employees`,
    async function (err, res) {
      if (err) {
        console.log(`Something went wrong: ${err}`);
        return;
      }
      // parse data object
      resObjArr = JSON.parse(JSON.stringify(res));

      // add each employee (name attribute) to the employees array
      for (res of resObjArr) {
        employees.push(res.employee);
      }

      // use the array of employees for user choices
      const employee = await inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: `Which employee would you like to remove?`,
          choices: employees,
        },
      ]);
      // pass the user selection to the delete function
      delets.deleteEmployee(employee.employee);
    }
  );
};

removeRolePrompt = () => {
  db.query(`SELECT * FROM roles`, async function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    resObjArr = JSON.parse(JSON.stringify(res));
    for (res of resObjArr) {
      roles.push(res.title);
    }

    const role = await inquirer.prompt([
      {
        type: "list",
        name: "role",
        message: `Which role would you like to remove?`,
        choices: roles,
      },
    ]);
    delets.deleteRole(role.role);
  });
};

updateEmployeeRolePrompt = async function () {
  const updateRole = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: `What is the name of the employee being updated?`,
      choices: await gets.getEmployees(),
    },
    {
      type: "list",
      name: "role",
      message: `What is the employee's new role?`,
      choices: await gets.getRoles(),
    },
    {
      type: "list",
      name: "dept",
      message: `What is the employee's department?`,
      choices: await gets.getDepartments(),
    },
  ]);
  // convert to integers to pass through id fields
  update.updateEmployeeRole(
    update.updateRole.employee.charAt(0),
    update.updateRole.role.charAt(0),
    update.updateRole.dept.charAt(0)
  );
};

module.exports = {
  addDepartment,
  addEmployee,
  addRole,
  deleteDepartment,
  deleteRole,
  updateEmployeeRole,
};
