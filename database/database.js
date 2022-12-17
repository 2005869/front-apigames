const Sequelize = require('sequelize');

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './database/frontapigames.sqlite'
});

module.exports = connection;