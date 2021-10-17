const consoleTable = require("console.table");
const db = require("../db/connection");
const prompts = require("../lib/prompts");

updateEmployeeRole = (employeeId, roleId, deptId) => {
  const query = `UPDATE employees
                  SET role_id = ?, dept_id = ?
                  WHERE id = ?;`;
  const params = [roleId, deptId, employeeId];
  db.query(query, params, function (err, res) {
    if (err) {
      console.log(`Something went wrong: ${err}`);
      return;
    }
    console.log(`\n\nEmployee Role Updated.`);
    console.log(`Press UP or DOWN to continue...`);
  });
  prompts.promptUser();
};

module.exports = { updateEmployeeRole };
