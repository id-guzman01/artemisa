var mysql = require('mysql');

var config = {
    host : 'localhost',
    database : 'pr',
    user : 'root',
    password : '1234',
    port: '3306'
};

const conexion = new mysql.createConnection(config);

module.exports = conexion;
