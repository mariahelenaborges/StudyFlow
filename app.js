const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const sequelize = require("./db/conn");

const atividadeRoutes = require("./routes/atividades");
const CadastroEstudante = require("./models/CadastroEstudante");
const Atividade = require("./models/Atividade")(sequelize);

const app = express();

const PORT = 3000;

app.engine(
    "handlebars",
    engine({
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    })
);

app.set("view engine", "handlebars");

app.set(
    "views",
    path.join(__dirname, "views")
);

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.use(
    "/atividades",
    atividadeRoutes
);

app.get("/cadastro-atividades", async (req, res) => {

    try {

        const atividades =
            await Atividade.findAll({
                order: [
                    ["entrega", "ASC"]
                ]
            });

        res.render(
            "atividades",
            {
                atividades:
                    atividades.map(
                        atividade =>
                            atividade.toJSON()
                    )
            }
        );

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao carregar atividades."
        );

    }

});

app.post("/cadastro-atividades/criar", async (req, res) => {

    try {

        const {
            nome,
            materia,
            tipo,
            entrega
        } = req.body;

        if (!nome || !materia || !tipo || !entrega) {

            console.log("Campos vazios");

            return res.redirect("/cadastro-atividades");

        }

        await Atividade.create({
            nome,
            materia,
            tipo,
            entrega
        });

        res.redirect("/cadastro-atividades");

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao cadastrar atividade."
        );

    }

});

app.get("/editar/:id", async (req, res) => {

    try {

        const atividade =
            await Atividade.findByPk(
                req.params.id
            );

        if (!atividade) {

            return res.send(
                "Atividade nao encontrada"
            );

        }

        res.render(
            "editarAtividade",
            {
                atividade: atividade.toJSON()
            }
        );

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao buscar atividade."
        );

    }

});

app.post("/editar", async (req, res) => {

    try {

        const {
            id,
            nome,
            materia,
            tipo,
            entrega
        } = req.body;

        await Atividade.update(
            {
                nome,
                materia,
                tipo,
                entrega
            },
            {
                where: {
                    id
                }
            }
        );

        res.redirect("/cadastro-atividades");

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao atualizar atividade."
        );

    }

});

app.post("/excluir", async (req, res) => {

    try {

        const { id } = req.body;

        await Atividade.destroy({
            where: {
                id
            }
        });

        res.redirect("/cadastro-atividades");

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao excluir atividade."
        );

    }

});

//cadastro de estudantes
app.get("/", async (req, res) => {

    try {

        const estudantes =
            await CadastroEstudante.findAll({
                raw: true
            });

        res.render(
            "cadastroHome",
            {
                estudantes
            }
        );

    } catch (erro) {

        console.log(erro);

        res.status(500).send(
            "Erro ao carregar estudantes."
        );

    }

});


app.get(
    "/estudante/novo",
    (req, res) => {

        res.render(
            "cadastroCriar"
        );

    }
);


app.post(
    "/estudante/salvar",
    async (req, res) => {

        try {

            const {
                nome,
                email,
                curso
            } = req.body;

            await CadastroEstudante.create({
                nome,
                email,
                curso
            });

            res.redirect("/");

        } catch (erro) {

            console.log(erro);

            res.status(500).send(
                "Erro ao cadastrar estudante."
            );

        }

    }
);


app.get(
    "/estudante/editar/:id",
    async (req, res) => {

        try {

            const estudante =
                await CadastroEstudante.findByPk(
                    req.params.id,
                    {
                        raw: true
                    }
                );

            if (!estudante) {

                return res.redirect("/");

            }

            res.render(
                "cadastroEditar",
                {
                    estudante
                }
            );

        } catch (erro) {

            console.log(erro);

            res.status(500).send(
                "Erro ao buscar estudante."
            );

        }

    }
);


app.post(
    "/estudante/atualizar",
    async (req, res) => {

        try {

            const {
                id,
                nome,
                email,
                curso
            } = req.body;

            await CadastroEstudante.update(
                {
                    nome,
                    email,
                    curso
                },
                {
                    where: {
                        id
                    }
                }
            );

            res.redirect("/");

        } catch (erro) {

            console.log(erro);

            res.status(500).send(
                "Erro ao atualizar estudante."
            );

        }

    }
);


app.post(
    "/estudante/deletar/:id",
    async (req, res) => {

        try {

            await CadastroEstudante.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect("/");

        } catch (erro) {

            console.log(erro);

            res.status(500).send(
                "Erro ao excluir estudante."
            );

        }

    }
);

sequelize
    .sync()
    .then(() => {

        console.log(
            "Banco conectado com sucesso!"
        );

        app.listen(
            PORT,
            () => {

                console.log(
                    `Servidor rodando em http://localhost:${PORT}`
                );

            }
        );

    })
    .catch((erro) => {

        console.log(
            "Erro ao conectar com o banco:",
            erro
        );

    });
