const express = require("express");
const { engine } = require("express-handlebars");

const sequelize = require("./db/conn");
const atividadeRoutes = require("./routes/atividades");

const app = express();

// Configuração do Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Rotas
app.use("/atividades", atividadeRoutes);

app.get("/", (req, res) => {
    res.redirect("/atividades");
});

// Inicialização
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000");
    });
}).catch((err) => {
    console.log(err);
});