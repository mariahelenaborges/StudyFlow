const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");


const Atividade = sequelize.define("Atividade", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  materia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entrega: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


module.exports = Atividade;
