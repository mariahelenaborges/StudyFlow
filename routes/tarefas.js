const express = require("express");
const router = express.Router();

const Atividade = require("../models/Atividade");


router.get("/", async (req, res) => {
  const atividades = await Atividade.findAll({
    order: [["entrega", "ASC"]]
  });

  res.render("atividades", { atividades: atividades.map(a => a.toJSON()) });
});

router.post("/criar", async (req, res) => {
  const { nome, materia, tipo, entrega, estudanteId } = req.body;

  if (!nome || !materia || !tipo || !entrega) {
    console.log("Campos vazios");
    return res.redirect("/tarefas");
  }

  await Atividade.create({
    nome,
    materia,
    tipo,
    entrega,
    estudanteId: estudanteId || null
  });

  res.redirect("/tarefas");
});

router.get("/editar/:id", async (req, res) => {
  const atividade = await Atividade.findByPk(req.params.id);

  if (!atividade) {
    return res.send("Atividade nao encontrada");
  }

  res.render("editarAtividade", { atividade: atividade.toJSON() });
});

router.post("/editar", async (req, res) => {
  const { id, nome, materia, tipo, entrega } = req.body;

  await Atividade.update(
    { nome, materia, tipo, entrega },
    { where: { id } }
  );

  res.redirect("/tarefas");
});

router.post("/excluir", async (req, res) => {
  const { id } = req.body;

  await Atividade.destroy({
    where: { id }
  });

  res.redirect("/tarefas");
});


module.exports = router;
