const mysql = require('mysql');

let DATABASE_IP = process.env.DATABASE_IP || 'localhost';

const connection = mysql.createConnection({
    host: DATABASE_IP,
    user: "mysql",
    password: "mysql",
    database: "mysql"
});

connection.connect((err) => {

    if(!err)
        console.log('Database is connected!');
    else
        console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
    });

module.exports = connection;