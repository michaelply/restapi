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

    // Create database
    let sql = "CREATE DATABASE ecommerce";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Database created");
      });

    // Use database
    sql = "USE ecommerce";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Using ecommerce_a1 database");
      });

    // Create books table
    sql = "CREATE TABLE books (ISBN VARCHAR(255), title VARCHAR(255), Author VARCHAR(255), description VARCHAR(255), genre VARCHAR(255), price double, quantity int, PRIMARY KEY(ISBN))";
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result); 
        console.log("Books table created"); 
    });    

    // Create customers table
    sql = "CREATE TABLE customers (id int AUTO_INCREMENT UNIQUE, userId VARCHAR(255) UNIQUE, name VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), address2 VARCHAR(255), city VARCHAR(255), state VARCHAR(255), zipcode VARCHAR(255), PRIMARY KEY(id))";
    connection.query(sql,  (err, result) => {
        if (err) throw err;
        console.log(result); 
        console.log("Customers table created"); 
    });    
});