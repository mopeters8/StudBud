const util = require('util');
const mysql = require('mysql');

/**
 * Connection to the database.
 */

const pool = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost' ,
    user: 'admin',
    password: 'adminpass',
    databse: 'www'
});

pool.getConnection((err, connection) => {
    if(err)
        console.error("Something went wrong connecting to the database..");
    if (connection)
        connection.release()
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;