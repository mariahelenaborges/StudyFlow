const sequelize = require("../db/conn");

const CadastroEstudante = require("./CadastroEstudante");
const Atividade = require("./Atividade");
const Calendario = require("./Calendario");


CadastroEstudante.hasMany(Atividade, {
  foreignKey: { name: "estudanteId", allowNull: true },
  as: "atividades",
  onDelete: "SET NULL"
});

Atividade.belongsTo(CadastroEstudante, {
  foreignKey: { name: "estudanteId", allowNull: true },
  as: "estudante"
});


CadastroEstudante.hasMany(Calendario, {
  foreignKey: { name: "estudanteId", allowNull: true },
  as: "eventos",
  onDelete: "SET NULL"
});

Calendario.belongsTo(CadastroEstudante, {
  foreignKey: { name: "estudanteId", allowNull: true },
  as: "estudante"
});


module.exports = {
  sequelize,
  CadastroEstudante,
  Atividade,
  Calendario
};
