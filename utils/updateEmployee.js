const db = require("../db/connection");
const inquirer = require("inquirer");
const { roleChoices } = require("./addEmployee");
const { departmentChoices } = require("./addRole");
const showAllEmployees = require("./showEmployees");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function employeeChoices() {
  const employees = [];
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, first_name, last_name FROM employee`;
    db.query(sql, (err, res) => {
      if (err) {
        reject(err);
      }
      let responses = JSON.parse(JSON.stringify(res));
      responses.forEach((element) => {
        employees.push(
          element.id + ". " + element.first_name + " " + element.last_name
        );
      });
      resolve(employees);
    });
  });
}

function editEmpTable(id, role, dep) {
  const sql = `UPDATE employee SET role_id = ?, dept_id = ? WHERE id = ?`;
  const params = [role, dep, id];
  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(chalk.green("Employee role updated."));
    promptUser();
  });
}

updateEmployee = async () => {
  const roleUpdateRes = await inquirer.prompt([
    {
      type: "list",
      name: "updateEmp",
      message: "Which employee would you like to update?",
      choices: await employeeChoices(),
    },
    {
      type: "list",
      name: "updateRole",
      message: "What is this employees updated role?",
      choices: await roleChoices(),
    },
    {
      type: "list",
      name: "updateDep",
      message: "Which department does this role belong to?",
      choices: await departmentChoices(),
    },
  ]);
  const selectedEmpId = roleUpdateRes.updateEmp.charAt(0);
  const selectedRoleId = roleUpdateRes.updateRole.charAt(0);
  const selectedDepId = roleUpdateRes.updateDep.charAt(0);
  editEmpTable(selectedEmpId, selectedRoleId, selectedDepId);
};

module.exports = { updateEmployee, roleChoices, employeeChoices };
