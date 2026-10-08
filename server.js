const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");

const { sequelize } = require("./models");

const estudanteRoutes = require("./routes/estudantes");
const tarefaRoutes = require("./routes/tarefas");
const calendarioRoutes = require("./routes/atividades");


const app = express();

app.engine("handlebars", engine({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", estudanteRoutes);            
app.use("/tarefas", tarefaRoutes);        
app.use("/atividades", calendarioRoutes); 

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log("StudyFlow rodando em http://localhost:3000");
    });
}).catch((err) => {
    console.log(err);
});
