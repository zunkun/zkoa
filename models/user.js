const mysql = require('../utils/db/mysql');
const Sequelize = require('sequelize');

const User = mysql.define('users', {
	name: Sequelize.STRING,
	age: Sequelize.INTEGER,
	gender: Sequelize.STRING
});

User.sync();

module.exports = User;
