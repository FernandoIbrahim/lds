const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.db', // O caminho
});

module.exports = sequelize;

