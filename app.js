const inquirer =  require("inquirer");
const db = require('./db/connection');
require('console.table');

db.connect(err => {
  if(err) throw err;
  trackerAction();
});

function trackerAction() {
    inquirer.prompt({
      type:'list',
      name: 'action',
      message: "What would you like to do?",
      choices: [
      'View All Departments', 
      'View All Employees', 
      'View All Roles',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Quit']
    }).then((answer) => {
      switch(answer.action){
        case "View All Departments":
        viewDepartments();
        break;

        case "View All Employees":
        viewEmployees();
        break;

        case "View All Roles":
        viewRoles();
        break;

        case "Add A New Department":
        addDepartment();
        break;

        case "Add A Role":
        addRole();
        break;

        case "Add A New Employee":
        addEmployee();
        break;

        case "Update An Employee's Role":
        updateRole();
        break;

        case "Quit":
          db.end()
          break;
    }
  });
};

// function viewDepartments() { 
//   db.promise().query(`SELECT * FROM department`)
//   .then(allDepartments => {
//     console.log('Showing all departments');
//     console.table(allDepartments[0]);
//     //console.log(allDepartments[0]);
//   })
// };

function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all departments');
        console.table(data);
        trackerAction();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all employees');
        console.table(data);
        trackerAction();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all roles');
        console.table(data);
        trackerAction();
    });
}




//trackerAction();