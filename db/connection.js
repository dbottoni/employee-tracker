const mysql = require("mysql2");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Erin@1234',
  database: 'business'
},
  console.log('You are now connected to the employee tracker database')

);


module.exports = db;