const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bd_cadastro_ribeiro.sqlite' 
});

module.exports = sequelize;