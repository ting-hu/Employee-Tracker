const db = require("../db/connection");
const inquirer = require("inquirer");
const chalk = require("chalk");
const mysql = require("mysql2");
const prompts = require("../app");

function addDepartment() {
  return inquirer
    .prompt({
      type: "input",
      name: "addDep",
      message: "Enter the name of the department to add: ",
    })
    .then((response) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const userInput = response.addDep;
      db.query(sql, userInput, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(chalk.green("Input added to departments table."));
        promptUser();
      });
    });
}

module.exports = addDepartment;
