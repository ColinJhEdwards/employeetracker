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
  let query = "SELECT employee.id, employee.first_name, employee.last_name ";
  query += "FROM employee ";
  connection.query(query, function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          message: "Which employee would you like to delete?",
          choices: function () {
            let choiceArray = [];
            for (let i = 1; i < results.length; i++) {
              let emp = " ";
              emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name}`;
              choiceArray.push(emp);
            }
            return choiceArray;
          },
        },
      ])
      .then(function (answer) {
        deleteRemovedEmp(answer);
        return answer;
      });
  });
  promptUser();
}

function deleteRemovedEmp(answer) {
  let choiceStr = answer.choice.split(" ");
  connection.query(
    "DELETE FROM employee WHERE ?",
    [
      {
        id: parseInt(choiceStr[0]),
      },
    ],
    function (error, res) {
      if (error) throw error;
      console.log(res.affectedRows + " You DELETED the Employee!");
      promptUser();
    }
  );
}

function updateEmployee() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, department.dept_name, employee.roles_id, roles.title ";
  query += "FROM employee ";
  query += "INNER JOIN department ON employee.emp_dept = department.dept_name ";
  query += "INNER JOIN roles ON department.id = roles.department_id ";

  connection.query(query, function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          message: "Which employee's role would you like to update?",
          choices: function () {
            let choiceArray = [];
            for (let i = 1; i < results.length; i++) {
              let emp = "";
              emp = `${results[i].id} ${results[i].first_name} ${results[i].last_name} ${results[i].dept_name} ${results[i].roles_id} ${results[i].title}`;
              choiceArray.push(emp);
            }
            return choiceArray;
          },
        },
        {
          name: "roleUpdate",
          type: "list",
          message:
            "What role would you like to update this employee's role to?",
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
        updateToChosenRole(answer);
        return answer;
      });
  });
}

function updateToChosenRole(answer) {
  newRoleId = "";
  newDept = "";
  newMgr = "";

  if (answer.roleUpdate === "Talent Management") {
    newRoleId = 2;
    newDept = "Human Resources";
    newMgr = 1;
  }
  if (answer.roleUpdate === "Collections Agent") {
    newRoleId = 3;
    newDept = "Finances";
    newMgr = 3;
  }
  if (answer.roleUpdate === "Merchandise Specialist") {
    newRoleId = 4;
    newDept = "Production & Inventory";
    newMgr = 6;
  }
  if (answer.roleUpdate === "Chef") {
    newRoleId = 5;
    newDept = "Cafeteria & Catering";
    newMgr = 1;
  }
  if (answer.roleUpdate === "Marketing Director") {
    newRoleId = 6;
    newDept = "Marketing & Advertisement";
    newMgr = 1;
  }

  let choiceStr = answer.choice.split(" ");
  console.log(answer);
  console.log(choiceStr[0]);

  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        roles_id: newRoleId,
        emp_dept: newDept,
        manager_id: newMgr,
      },
      {
        id: parseInt(choiceStr[0]),
      },
    ],
    function (error, res) {
      if (error) throw error;
      console.log(res.affectedRows + " You UPDATED the Employee's Role!");
      promptUser();
    }
  );
}

function exitApp() {
  console.log("Closing Application....");
  connection.end();
}
