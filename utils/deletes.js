const db = require("../db/connection");
const prompts = require("../lib/prompts");

deleteEmployee = (employee) => {
  const query = `DELETE FROM employees
                  WHERE CONCAT(first_name, ' ', last_name) = ?`;
  const param = employee;
  db.query(query, param, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nEmployee Deleted.`);
    console.log("Press UP or DOWN to continue...");
  });
  promptUser();
};

deleteRole = (role) => {
  const query = `DELETE FROM roles
                  WHERE title = ?`;
  const param = role;
  db.query(query, param, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nRole Deleted.`);
    console.log("Press UP or DOWN to continue...");
  });
  promptUser();
};

deleteDepartment = (department) => {
  const query = `DELETE FROM departments
                  WHERE name = ?`;
  const param = department;
  db.query(query, param, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nDepartment Deleted.`);
    console.log("Press UP or DOWN to continue...");
  });
  promptUser();
};

module.exports = { deleteEmployee, deleteRole, deleteDepartment };
