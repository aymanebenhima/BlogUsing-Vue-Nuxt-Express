const Sequelize = require('sequelize');

const connection = new Sequelize('blog_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = connection;