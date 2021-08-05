const inquirer =  require("inquirer");
//const consoleTable =  require("console.table");

function trackerAction() {
    inquirer.prompt({
      type:'list',
      name: 'action',
      message: "What would you like to do?",
      choices: [
      'View All Employees', 
      'View All Departments', 
      'View All Roles',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Quit']
    }).then((answer) => {
      switch(answer.action){
        case "View All Employees":
        viewEmployees();
        break;

        case "View All Departments":
        viewDepartments();
        break;

      }

    })


}

// function viewEmployees() {
//   db.query
//   }