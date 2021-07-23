const util = require('util');
const mysql = require('mysql');

/**
 * Connection to the database.
 */

const myConnection = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost' ,
    user: 'root',
    password: 'root',
    database: 'www'
});

myConnection.getConnection((err, connection) => {
    if(err)
        console.error("Something went wrong connecting to the database..");
    if (connection)
        connection.release();
    return;
});

myConnection.query = util.promisify(myConnection.query);

module.exports = myConnection;