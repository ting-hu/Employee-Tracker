const db = require("../db/connection");
const inquirer = require("inquirer");
const { managerChoices } = require("./updateManager");
const { departmentChoices } = require("./addRole");
const prompts = require("../app");
const mysql = require("mysql2");

//sql commands to display the employee table filtered by department
function showEmpByDep(department) {
  const sql = `SELECT employee.first_name, employee.last_name FROM employee WHERE dept_id = ?`;
  const params = department;
  db.query(sql, params, (err, res) => {
    if (err) {
      console.log(err);
    }
    console.table(res);
    promptUser();
  });
}

//ask users which department they would like to view employees for
viewEmpByDep = async () => {
  const userChoice = await inquirer.prompt({
    type: "list",
    name: "dep",
    message: "Select the department to view employees within that department.",
    choices: await departmentChoices(),
  });
  const depId = userChoice.dep.charAt(0);
  showEmpByDep(depId);
};

module.exports = viewEmpByDep;
