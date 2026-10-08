const express = require("express");
const router = express.Router();

const CadastroEstudante = require("../models/CadastroEstudante");

router.get("/", async (req, res) => {
    const estudantes = await CadastroEstudante.findAll();
    res.render("cadastroHome", { estudantes, layout: false });
});


router.get("/estudante/novo", (req, res) => {
    res.render("cadastroCriar", { layout: false });
});


router.post("/estudante/salvar", async (req, res) => {
    const { nome, email, curso } = req.body;
    await CadastroEstudante.create({ nome, email, curso });
    res.redirect("/");
});


router.get("/estudante/editar/:id", async (req, res) => {
    const estudante = await CadastroEstudante.findByPk(req.params.id);
    res.render("cadastroEditar", { estudante, layout: false });
});


router.post("/estudante/atualizar", async (req, res) => {
    const { id, nome, email, curso } = req.body;
    await CadastroEstudante.update({ nome, email, curso }, { where: { id } });
    res.redirect("/");
});


router.post("/estudante/deletar/:id", async (req, res) => {
    await CadastroEstudante.destroy({ where: { id: req.params.id } });
    res.redirect("/");
});


module.exports = router;
