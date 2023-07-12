const {Sequelize} = require("sequelize");
const sequelize =  new Sequelize('db', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequelize