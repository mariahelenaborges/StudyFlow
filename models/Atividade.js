const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Atividade = sequelize.define('Atividade', {
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
  })

  return Atividade
}
