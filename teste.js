const express = require('express')
const mongoose = require('mongoose')
const MyModel = require('./models/data-model')
const bodyParser = require('body-parser');
const controller = require('./controllers/data-controller')
const variables = require('./config/variables')

const _ctrl = new controller();

const app = express()
app.set('view engine', 'ejs');

// Configurações do parse com body-parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importando rotas da aplicação
const dataRouter = require('./routers/data-router')

// Inicializando o servidor da aplicação
app.listen(variables.Api.port, function (err) {
  if (err) return console.log(err)
  console.log('Servidor inicializado na porta', variables.Api.port)
})

// Conectando ao banco de dados
try {
  mongoose.connect(
    "mongodb://admin:admin123@ds255107.mlab.com:55107/crud_tutorial",
    { useNewUrlParser: true }
  )
  console.log("Usuário conectado com sucesso ao banco de dados")
} catch (error) {
  console.log(error)
}


// Definindo as rotas da aplicação
app.get('/', function (req, res) {
  res.render('index.ejs')
})
app.get('/view/:id', _ctrl.actionView)
app.get('/edit/:id', _ctrl.getById)

app.use('/api/data', dataRouter)
app.use('/api/data/delete/:id', _ctrl.delete)
app.use('/api/data/put/:id', _ctrl.put)



// Persistindo no banco a partir de um model
// MyModel.create(
//   { name: 'fulano com import', surname: 'de tal com import' },
//   function (err) {
//     if (err) return console.log(err)
//     console.log('nova informação adicionada com sucesso')
//   }
// )

// MyModel.find(function (err, data) {
//   if (err) console.log(err)
//   console.log(data)
// })