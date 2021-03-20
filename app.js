const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "0550070@cjhe",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  promptUser();
});

const promptUser = () => {
  inquirer
    .prompt({
      name: "select",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments.",
        "View all employees.",
        "View all employees by department.",
        "View all employees by manager.",
        "Add employee.",
        "Remove employee.",
        "Update employee role.",
        "Exit Application.",
      ],
    })
    .then((ans) => {
      switch (ans.select) {
        case "View all departments.":
          viewDepartments();
          break;
        case "View all employees.":
          viewEmployees();
          break;
        case "View all employees by department.":
          viewEmpbyDept();
          break;
        case "View all employees by manager.":
          viewEmpByMan();
          break;
        case "Add employee.":
          addEmployee();
          break;
        case "Remove employee.":
          removeEmployee();
          break;
        case "Update employee role.":
          updateEmployee();
          break;
        case "Exit Application.":
          exitApp();
          break;
      }
    });
};

function viewDepartments() {
  console.log("Works");
  promptUser();
}

function viewEmployees() {
  console.log("Works");
  promptUser();
}

function viewEmpbyDept() {
  console.log("Works");
  promptUser();
}

function viewEmpByMan() {
  console.log("Works");
  promptUser();
}

function addEmployee() {
  console.log("Works");
  promptUser();
}

function removeEmployee() {
  console.log("Works");
  promptUser();
}

function updateEmployee() {
  console.log("Works");
  promptUser();
}

function exitApp() {
  console.log("Closing Application....");
  connection.end();
}
