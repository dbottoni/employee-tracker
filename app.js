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




