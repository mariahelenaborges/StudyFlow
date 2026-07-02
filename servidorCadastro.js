const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');
const CadastroEstudante = require('./models/CadastroEstudante'); // DIRECIONAMENTO CORRIGIDO

const app = express();

app.engine('handlebars', exphbs.engine({ 
    defaultLayout: false,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

sequelize.sync().then(() => console.log("Banco StudyFlow conectado com sucesso!"));

app.get('/', async (req, res) => {
    const estudantes = await CadastroEstudante.findAll();
    res.render('cadastroHome', { estudantes }); 
});

app.get('/estudante/novo', (req, res) => {
    res.render('cadastroCriar'); 
});


app.post('/estudante/salvar', async (req, res) => {
    const { nome, email, curso } = req.body;
    await CadastroEstudante.create({ nome, email, curso });
    res.redirect('/');
});


app.get('/estudante/editar/:id', async (req, res) => {
    const estudante = await CadastroEstudante.findByPk(req.params.id);
    res.render('cadastroEditar', { estudante }); 
});


app.post('/estudante/atualizar', async (req, res) => {
    const { id, nome, email, curso } = req.body;
    await CadastroEstudante.update({ nome, email, curso }, { where: { id } });
    res.redirect('/');
});


app.post('/estudante/deletar/:id', async (req, res) => {
    await CadastroEstudante.destroy({ where: { id: req.params.id } });
    res.redirect('/');
});

app.listen(3000, () => console.log('StudyFlow [Módulo Cadastro] rodando na porta 3000'));