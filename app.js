const express = require('express')
const exphbs = require('express-handlebars')
const { Sequelize } = require('sequelize')
const path = require('path')

const app = express()
const PORT = 3000

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './banco.sqlite'
})

const Atividade = require('./models/Atividade')(sequelize)

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
  const atividades = await Atividade.findAll({
    order: [['entrega', 'ASC']]
  })

  res.render('atividades', { atividades: atividades.map(a => a.toJSON()) })
})

app.post('/criar', async (req, res) => {
  const { nome, materia, tipo, entrega } = req.body

  if (!nome || !materia || !tipo || !entrega) {
    console.log("Campos vazios")
    return res.redirect('/')
  }

  await Atividade.create({
    nome,
    materia,
    tipo,
    entrega
  })

  res.redirect('/')
})

app.get('/editar/:id', async (req, res) => {
  const id = req.params.id
  const atividade = await Atividade.findByPk(id)

  if (!atividade) {
    return res.send('Atividade nao encontrada')
  }

  res.render('editarAtividades', { atividade: atividade.toJSON() })
})

app.post('/editar', async (req, res) => {
  const { id, nome, materia, tipo, entrega } = req.body

  await Atividade.update(
    { nome, materia, tipo, entrega },
    { where: { id } }
  )

  res.redirect('/')
})

app.post('/excluir', async (req, res) => {
  const { id } = req.body

  await Atividade.destroy({
    where: { id }
  })

  res.redirect('/')
})

// Inicia o servidor apenas quando este arquivo for executado diretamente.
// Isso evita que múltiplas instâncias do servidor sejam iniciadas
// se este módulo for importado por outro arquivo (ex.: depois de um merge).
if (require.main === module) {
  sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
  }).catch((erro) => {
    console.log('Erro ao conectar com o banco:', erro)
  })
} else {
  module.exports = app
}
