const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd'); 

const CadastroEstudante = sequelize.define('CadastroEstudante', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  curso: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = CadastroEstudante;