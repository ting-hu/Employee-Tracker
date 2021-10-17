const db = require("../db/connection");
const inquirer = require("inquirer");
const showAllDep = require("./showDepartment");
const prompts = require("../app");
const chalk = require("chalk");
const mysql = require("mysql2");

function addDepartment() {
  //prompt user for input
  return inquirer
    .prompt({
      type: "input",
      name: "addDep",
      message: "Enter the name of the department to add: ",
    })
    .then((response) => {
      //seed the database with user input
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const userInput = response.addDep;
      db.query(sql, userInput, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(chalk.green("Input added to departments table."));
        // showAllDep();
        //promptUser to choose an option once again
        promptUser();
      });
    });
}

module.exports = addDepartment;
