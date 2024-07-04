// backend/config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bench_sharing', 'your_mysql_user', 'your_mysql_password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
