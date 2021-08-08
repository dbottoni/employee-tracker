const inquirer = require('inquirer');
const db = require('./db/connection');
const constTable = require('console.table');

//const express = require('express');

db.connect(err => {
  if(err) throw err;
  begin();
});


function begin () { 
  inquirer.prompt(
    {
      name: 'start',
      type: 'rawlist',
      message: 'What would you like to do>',
      choices: [
        "View All Departments",
        "View All Employees",
        "View All Roles",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role"      
      ]
  })
  .then((response) => {
    if(response.start === "View All Departments"){
      viewDepartments();
    } else if (response.start == "View All Employees"){
      viewEmployees();
    } else if (response.start == "View All Roles"){
      viewRoles();
    } else if (response.start == "Add Department"){
      addDept();
    } else if (response.start == "Add Role"){
      addRole();
    } else if (response.start == "Add Employee"){
      addEmployee();
    } else if (response.start == "Update Employee Role"){
      updateEmpRole();
    }

  });

 };

function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all departments');
        console.table(data);
        begin();
    });
}

function viewEmployees() {
    db.query(`SELECT * FROM employee`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all employees');
        console.table(data);
        begin();
    });
}

function viewRoles() {
    db.query(`SELECT * FROM role`, (err, data) => {
        if (err) throw err;
        console.log('Displaying all roles');
        console.table(data);
        begin();
    });
}

function addDept() { 
 return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the new department name?',
      validate: departmentInput => {
        if (departmentInput){
          return true;
        } else {
          console.log("Please enter a name for the department");
          return false;
        }
      }
    },
  ]).then(answer => {
    db.query(`INSERT INTO department SET ?`, {name: answer.department}, (err) =>{
      if(err) throw err;
      console.log(`New department ${answer.department} has been added.`);
      begin();
    })
  }); 
}

//addRole & addEmployee functions borrowed with permission from Spencer Berkebile, credits and link to his GithUb in ReadMe File
function addRole() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title for the new role?',
                validate: (value) => {
                    if(value) {
                        return true;
                    } else {
                        console.log('Please enter the title.');
                    }
                }
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for the new role?',
                validate: (value) => {
                    if(value) {
                        return true;
                    } else {
                        console.log('Please enter the salary.');
                    }
                }
            },
            {
                name: 'department',
                type: 'rawlist',
                choices: () => {
                    let deptChoices = [];
                    for(let i = 0; i < results.length; i++) {
                        deptChoices.push(results[i].name);
                    }
                    return deptChoices;
                },
                message: 'What is the department for the new role?',
            }
        ]).then(answer => {
            let chosenDept;
            for(let i = 0; i < results.length; i++) {
                if(results[i].name === answer.department) {
                    chosenDept = results[i];
                }
            }

            db.query(`INSERT INTO role SET ?`,
            {
                title: answer.title,
                salary: answer.salary,
                department_id: chosenDept.id
            }, (err) => {
                if (err) throw err;
                console.log(`New Role ${answer.title} has been added.`);
                begin();
            })
        });
    });
}

function addEmployee() {
    const sql = `SELECT * FROM employee, role`;
    db.query(sql, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'first',
                type: 'input',
                message: 'What is their first name?',
                validate: (value) => {
                    if(value) {
                        return true;
                    } else {
                        console.log('Please enter their first name.');
                    }
                }
            },
            {
                name: 'last',
                type: 'input',
                message: 'What is their last name?',
                validate: (value) => {
                    if(value) {
                        return true;
                    } else {
                        console.log('Please enter their last name.');
                    }
                }
            },
            {
                name: 'role',
                type: 'rawlist',
                choices: () => {
                    let roleChoices = [];
                    for(let i = 0; i < results.length; i++) {
                        roleChoices.push(results[i].title);
                    }
                    let freshArray = [...new Set(roleChoices)];
                    return freshArray;
                },
                message: 'What is their role?'
            },
        ]).then(answer => {
            let chosenRole;

            for(let i = 0; i < results.length; i++) {
                if(results[i].title === answer.role) {
                    chosenRole = results[i];
                }
            }

            db.query(`INSERT INTO employee SET ?`,
            {
                first_name: answer.first,
                last_name: answer.last,
                role_id: chosenRole.id
            }, (err) => {
                if (err) throw err;
                console.log(`New employee ${answer.first} ${answer.last} has been added to the tracker in a ${answer.role} role.`);
                begin();
            })
        })
    });
}

function updateEmpRole () { 
  db.query(`SELECT * FROM employee, role`, (err,results) => {
    if (err) throw err;
    inquirer.prompt ([
      {
      name: 'employee',
      type: 'rawlist',
      choices: () => {
          let employeeChoices = [];
          for(let i = 0; i < results.length; i++) {
              employeeChoices.push(results[i].last_name);
          }
          let employeeArray = [...new Set(employeeChoices)];
          return employeeArray;
      },
      message: 'Please select the employee to update.'
    },  
    {
      name: 'role',
      type: 'rawlist',
      choices: () => {
          let roleChoices = [];
          for(let i = 0; i < results.length; i++) {
              roleChoices.push(results[i].title);
          }
          let roleArray = [...new Set(roleChoices)];
          return roleArray;
      },
      message: 'Please select the new role for this employee.'
    }
    ])
      .then(answer => {

      let chosenEmployee;
      let newRole;

      for(let i = 0; i < results.length; i++) {
          if(results[i].last_name === answer.name) {
              chosenEmployee = results[i];
          }
      }
      for(let i = 0; i < results.length; i++) {
          if(results[i].title === answer.role) {
              newRole = results[i];
          }
      }

      db.query(`UPDATE employee SET ? WHERE ?`,
      [
        {role_id: newRole},
        {last_name: chosenEmployee}
      ], (err) => {
        if (err) throw err;
        console.log(`The employee's role has been updated`);
        begin();
      })
    });
  });
 }