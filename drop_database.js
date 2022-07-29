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

    // Drop database
    sql = "drop database ecommerce";
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Drop ecommerce database");
        });

});