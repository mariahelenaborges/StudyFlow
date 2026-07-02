const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const Calendario = sequelize.define("Calendario", {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT
    },

    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    horario: {
        type: DataTypes.STRING
    }
});

module.exports = Calendario;