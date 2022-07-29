const mysql = require('mysql2');

// Amazon RDS
const RDS_HOSTNAME = 'restapi-demo.ciyvkcm9nhev.us-east-1.rds.amazonaws.com';
const RDS_PORT = "3306";
const RDS_USERNAME = "admin";
const RDS_PASSWORD = "mysqlpwd";

// MySQL
// const RDS_HOSTNAME = 'localhost';
// const RDS_PORT = "3306";
// const RDS_USERNAME = "root";
// const RDS_PASSWORD = "mysqlpwd";

var connection = mysql.createConnection({
    host     : RDS_HOSTNAME,
    user     : RDS_USERNAME,
    password : RDS_PASSWORD,
    port     : RDS_PORT,
});

// Connect
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database.');

    // Use database
    sql = "USE ecommerce";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Using ecommerce_a1 database");
      });

    // Read books table
    sql = "SELECT * FROM books;";
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result); 
        console.log("Books table retrieved"); 
    });    

    // Read customers table
    sql = "SELECT * FROM customers;";
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result); 
        console.log("Customers table retrieved"); 
    });    
});