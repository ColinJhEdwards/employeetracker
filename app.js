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
  connection.query(
    "Select id, dept_name, utilized_budget FROM department",
    function (err, res) {
      if (err) throw err;
      console.table("Departments", res);
      promptUser();
    }
  );
}

function viewEmployees() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, employee.salary, roles.title, mgr_name ";
  query += "FROM employee ";
  query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";
  query += "INNER JOIN roles ON department.id = roles.department_id ";
  query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

  connection.query(query, function (err, res) {
    console.table("All Employees", res);
    promptUser();
  });
}

function viewEmpbyDept() {
  let query =
    "SELECT department.dept_name, employee.id, employee.first_name, employee.last_name ";
  query += "FROM department ";
  query += "INNER JOIN employee ON employee.emp_dept = department.dept_name ";
  query += "ORDER BY department.dept_name";

  connection.query(query, function (err, res) {
    console.table("Employees By Manager", res);
    promptUser();
  });
}

function viewEmpByMan() {
  let query =
    "SELECT manager.id, manager.mgr_name, employee.first_name, employee.last_name ";
  query += "FROM manager ";
  query += "INNER JOIN employee ON manager.id = employee.manager_id ";
  query += "ORDER BY manager.mgr_name";
  connection.query(query, function (err, res) {
    console.table("Employees By Manager", res);
    promptUser();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "newEmpFirstName",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "newEmpLastName",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "newEmpDept",
        type: "list",
        message: "What is the new employee's department? ",
        choices: [
          "Human Resources",
          "Finances",
          "Production & Inventory",
          "Cafeteria and Catering",
          "Marketing & Advertisement",
        ],
      },
      {
        name: "newEmpSalary",
        type: "input",
        message: "What is the new employee's salary? ",
      },
      {
        name: "newEmpManager",
        type: "list",
        message: "Who will manage this new employee?",
        choices: ["Bertram Cooper", "Donald Draper", "Lane Pryce", "Nobody"],
      },
      {
        name: "newEmpRole",
        type: "list",
        message: "What will the new employee's role be?",
        choices: [
          "Talent Management",
          "Collections Agent",
          "Merchandise Specialist",
          "Chef",
          "Marketing Director",
        ],
      },
    ])

    .then(function (answer) {
      var newEmpsMgr = " ";

      if (answer.newEmpManager === "Bertram Cooper") {
        newEmpsMgr = 1;
      }

      if (answer.newEmpManager === "Donald Draper") {
        newEmpsMgr = 3;
      }

      if (answer.newEmpManager === "Lane Pryce") {
        newEmpsMgr = 6;
      }

      if (answer.newEmpManager === "Nobody") {
        newEmpsMgr = null;
      }

      var newEmpsRole = " ";

      if (answer.newEmpRole === "Talent Management") {
        newEmpsRole = 2;
      }
      if (answer.newEmpRole === "Collections Agent") {
        newEmpsRole = 3;
      }
      if (answer.newEmpRole === "Merchandise Specialist") {
        newEmpsRole = 4;
      }
      if (answer.newEmpRole === "Chef") {
        newEmpsRole = 5;
      }
      if (answer.newEmpRole === "Marketing Director") {
        newEmpsRole = 6;
      }

      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.newEmpFirstName,
          last_name: answer.newEmpLastName,
          emp_dept: answer.newEmpDept,
          salary: answer.newEmpSalary,
          roles_id: newEmpsRole,
          manager_id: newEmpsMgr,
        },

        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
          promptUser();
        }
      );
    });
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
