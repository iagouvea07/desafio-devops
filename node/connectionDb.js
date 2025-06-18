require('dotenv').config();

const config = {
    host: process.env.HOST || 'db',
    user: process.env.USER || 'root',
    password: process.env.PASSWORD || 'root',
    database: process.env.DATABASE || 'node_db' //5 - Alterado valor de nodedb para node_db, sendo equivalente ao node criado no init.sql
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

module.exports = connection;