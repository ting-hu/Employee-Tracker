const db = require("../db/connection");
const prompts = require("../lib/prompts");

addDepartment = (department) => {
  const query = `INSERT INTO departments(name)
                  VALUE(?)`;
  const param = department;
  db.query(query, param, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log("\n\nAdded department to database.");
    console.log(`Press UP or DOWN to continue...`);
  });
  promptUser();
};

addRole = (title, department, salary) => {
  const query = `INSERT INTO roles(title, department_id, salary)
                  VALUES(?, ?, ?)`;
  const params = [title, department, salary];
  db.query(query, params, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nRole Added Successfully.`);
    console.log(`Press UP or DOWN to continue...`);
  });
  promptUser();
};

addEmployee = (firstName, lastName, role, manager, department) => {
  const query = `INSERT INTO employees(first_name, last_name, role_id, manager_id, dept_id)
                  VALUES(?, ?, ?, ?, ?)`;
  const params = [firstName, lastName, role, manager, department];
  db.query(query, params, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nEmployee Added to Database.`);
  });
  promptUser();
};

addSalaries = () => {
  const query = `SELECT SUM(salary) salary_total
                  FROM roles`;
  db.query(query, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    let totalSalaries = JSON.stringify(res[0].salary_total);
    // format salary total (get rid of quotes around the string)
    console.log(
      `\n\nTotal utilized budget: $${totalSalaries.replace(/"/g, "")}`
    );
  });
  promptUser();
};

module.exports = { addDepartment, addRole, addEmployee, addSalries };
