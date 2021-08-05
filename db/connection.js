const mysql = require("mysql2");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Erin@1234',
  database: 'business'
});


module.exports = db;