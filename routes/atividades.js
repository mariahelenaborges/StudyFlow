const express = require("express");
const router = express.Router();

const Calendario = require("../models/Calendario");

async function renderizarCalendario(req, res, ano, mes) {

    try {

        const atividades = await Calendario.findAll({
            raw: true
        });

        const primeiroDia = new Date(ano, mes - 1, 1);
        const ultimoDia = new Date(ano, mes, 0);

        const diasNoMes = ultimoDia.getDate();
        const inicioSemana = primeiroDia.getDay();

        const calendario = [];
        let diaAtual = 1;

        for (let linha = 0; linha < 6; linha++) {

            const semana = [];

            for (let coluna = 0; coluna < 7; coluna++) {

                if ((linha === 0 && coluna < inicioSemana) || diaAtual > diasNoMes) {

                    semana.push(null);

                } else {

                    const dataFormatada =
                        `${ano}-${String(mes).padStart(2, "0")}-${String(diaAtual).padStart(2, "0")}`;

                    const atividadesDia = atividades.filter(
                        atividade => atividade.data === dataFormatada
                    );

                    semana.push({
                        numero: diaAtual,
                        atividades: atividadesDia
                    });

                    diaAtual++;
                }
            }

            calendario.push(semana);

            if (diaAtual > diasNoMes) break;
        }

        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril",
            "Maio", "Junho", "Julho", "Agosto",
            "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        let mesAnterior = mes - 1;
        let anoAnterior = ano;

        if (mesAnterior < 1) {
            mesAnterior = 12;
            anoAnterior--;
        }

        let proximoMes = mes + 1;
        let proximoAno = ano;

        if (proximoMes > 12) {
            proximoMes = 1;
            proximoAno++;
        }

        res.render("atividades/calendario", {
            calendario,
            mesAtual: meses[mes - 1],
            anoAtual: ano,
            mesAnterior,
            anoAnterior,
            proximoMes,
            proximoAno
        });

    } catch (erro) {

        console.log(erro);
        res.send("Erro ao carregar o calendário.");

    }
}


// Adicionar atividade
router.post("/add", async (req, res) => {

    try {

        await Calendario.create({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            data: req.body.data,
            horario: req.body.horario
        });

        res.redirect("/atividades");

    } catch (erro) {

        console.log(erro);
        res.send("Erro ao adicionar atividade.");

    }
});


// Abrir tela de edição
router.get("/editar/:id", async (req, res) => {

    try {

        const atividade = await Calendario.findByPk(
            req.params.id,
            {
                raw: true
            }
        );

        if (!atividade) {
            return res.redirect("/atividades");
        }

        res.render("atividades/editarCalendario", {
            atividade
        });

    } catch (erro) {

        console.log(erro);
        res.send("Erro ao buscar atividade.");

    }
});


// Salvar edição
router.post("/editar", async (req, res) => {

    try {

        await Calendario.update(
            {
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                data: req.body.data,
                horario: req.body.horario
            },
            {
                where: {
                    id: req.body.id
                }
            }
        );

        res.redirect("/atividades");

    } catch (erro) {

        console.log(erro);
        res.send("Erro ao editar atividade.");

    }
});


// Excluir atividade
router.post("/deletar/:id", async (req, res) => {

    try {

        await Calendario.destroy({
            where: {
                id: req.params.id
            }
        });

        res.redirect("/atividades");

    } catch (erro) {

        console.log(erro);
        res.send("Erro ao excluir atividade.");

    }
});

// Mês atual
router.get("/", async (req, res) => {

    const hoje = new Date();

    await renderizarCalendario(
        req,
        res,
        hoje.getFullYear(),
        hoje.getMonth() + 1
    );
});


// Mês específico
router.get("/:ano/:mes", async (req, res) => {

    const ano = parseInt(req.params.ano);
    const mes = parseInt(req.params.mes);

    await renderizarCalendario(
        req,
        res,
        ano,
        mes
    );
});

module.exports = router;