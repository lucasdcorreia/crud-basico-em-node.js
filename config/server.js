const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const variables = require('./variables')

const app = express()
app.set('view engine', 'ejs');

// Configurando conexão com bando de dados
var db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
  console.log('Conectado ao mongoDB')
})
mongoose.connect(variables.Database.connection, { useNewUrlParser: true }, (err, res) => {
  if (err) console.log(err)
  console.log("conectado ao banco")
})

// Configurando o parse de json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


// Routers
const dataRouter = require('../routers/data-router')

// Configurando as rotas
app.get('/', (req, res) => {
  res.status(200).render('../views/index')
})
app.use('/api/data', dataRouter)

// Exportando a API
module.exports = app