var express = require("express");
var mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL Local Database
// const RDS_HOSTNAME = 'localhost';
// const RDS_PORT = "3306";
// const RDS_USERNAME = "root";
// const RDS_PASSWORD = "mysqlpwd";

// Amazon RDS Cloud Database
const RDS_HOSTNAME = 'restapi-demo.ciyvkcm9nhev.us-east-1.rds.amazonaws.com';
const RDS_PORT = "3306";
const RDS_USERNAME = "admin";
const RDS_PASSWORD = "mysqlpwd";

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
        console.log("Using ecommerce database");
      });
});

// Retrieve book
app.get('/books/:ISBN', (req, res) => {

    let sql = `SELECT * FROM books WHERE ISBN="${req.params.ISBN}";`;
    let query = connection.query(sql, (err, results) => {
        if (err) {
            res.status(404).send("ISBN not found");
            return;
        } else {
            if (!results.length) {
                res.status(404).send("ISBN not found");
                return;
            } else {
                res.status(200).send(results[0]);
            }
        }
    });
})

// Add a book
app.post('/books', (req, res) => {
    console.log(req);
    // Check fields
    if (!req.body.ISBN || !req.body.title || !req.body.Author || !req.body.description || !req.body.genre || !req.body.price || !req.body.quantity) {
        res.status(400).send("All fields in the request body are mandatory");
        return;
    }

    // Check price decimal
    let price_2decimal;
    var isDecimal = (req.body.price).toString().indexOf('.') !== -1;
    if (isDecimal) {
        var digits = (req.body.price).toString().split(".")[1].length;
        if (digits > 2) {
            res.status(400).send("Price must be a valid number with 2 decimal places");
            return;
        } else if (digits <= 2) {
        price_2decimal = parseFloat(parseFloat(req.body.price).toFixed(2));
        }
    } else {
        price_2decimal = parseFloat(parseFloat(req.body.price).toFixed(2));
    };

    // Add book to database
    let post = {ISBN:req.body.ISBN, title:req.body.title, Author:req.body.Author, description:req.body.description, genre:req.body.genre, price:price_2decimal, quantity:req.body.quantity};
    sql = "INSERT INTO books SET ?";
    query = connection.query(sql, post, (err, results) => {

        if (err) {
            res.status(422).send({"message": "This ISBN already exists in the system."});
            return;
        } else {
            res.header("Location", `${req.get('host')}/books/${req.body.ISBN}`);
            res.status(201).send(post);
            return;
        }
    });
})

// // Add a customer
// app.post('/customers', body('userId').isEmail(), (req, res) => {

//     // Check fields
//     if (!req.body.userId || !req.body.name || !req.body.phone || !req.body.address || !req.body.city || !req.body.state || !req.body.zipcode) {
//         res.status(400).send("all keys in the request body are mandatory, except address2");
//         return;
//     }

//     // Check valid email
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(400).send('userId must be a valid email address');
//         return;
//     }

//     // Check US states
//     if (!states.includes(req.body.state)) {
//         res.status(400).send('state must be a valid 2-letter US state abbreviation');
//         return;
//     }

//     // Handle empty Address 2
//     let address2 = "";
//     if (req.body.address2) {
//         address2 = req.body.address2;
//     }

//     // Add customer to database
//     let post = {userId:req.body.userId, name:req.body.name, phone:req.body.phone, address:req.body.address, address2:address2, city:req.body.city, state:req.body.state, zipcode:req.body.zipcode};
//     sql = "INSERT INTO customers SET ?";
//     query = connection.query(sql, post, (err, results) => {

//         if (err) {
//             res.status(422).send({"message": "This user ID already exists in the system."});
//             return;
//         }
//         // } else {
//         //     res.header("Location", `${req.get('host')}/customers/${req.body.userId}`);
//         //     res.status(201).send(results);
//         //     return;
//         // }
//         else {
//             sql = "SELECT LAST_INSERT_ID() AS id;";
//             query1 = connection.query(sql, (err, results) => {
//                 let post = {id:results[0].id, userId:req.body.userId, name:req.body.name, phone:req.body.phone, address:req.body.address, address2:address2, city:req.body.city, state:req.body.state, zipcode:req.body.zipcode};
//                 res.header("Location", `${req.get('host')}/customers/${results[0].id}`);
//                 res.status(201).send(post);
//                 return;
//             });
//         }
//     });
// })

const port = 3000;
app.listen(port, () => console.log(`listening to port ${port}...`));