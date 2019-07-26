const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
<<<<<<< HEAD
const uri = "mongodb://admin:admin123@ds255107.mlab.com:55107/crud_tutorial";

=======
const uri = "mongodb://<usuário_do_banco>:<senha_para_acesso_ao_banco>@ds255107.mlab.com:55107/crud_tutorial";
>>>>>>> 5be9ab8e0b2d76a154a9d15c1790a4a8c2f0c1d8
const ObjectId = require('mongodb').ObjectID;

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err);
  db = client.db('<nome_do_banco>');

  app.listen(3000, function () {
    console.log('server running on port 3000');
  })
})


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
})

app.get('/', (req, res) => {
  var cursor = db.collection('data').find()
})

app.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
    if (err) return console.log(err)
    res.render('show.ejs', { data: results })

  })
})

app.post('/show', (req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('Salvo com sucesso')
    res.redirect('/show')
  })
  // res.send(req.body);
})

app.route('/edit/:id')
  .get((req, res) => {
    var id = req.params.id;
    console.log(id);

    db.collection('data').find({ _id: ObjectId(id) }).toArray((err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.render('edit.ejs', { data: result })
    })
  })
  .post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;

    db.collection('data').updateOne({ _id: ObjectId(id) }, {
      $set: {
        name: name,
        surname: surname
      }
    }, (err, result) => {
      if (err) return res.send(err)
      res.redirect('/show')
      console.log('Atualizado no Banco de Dados')
    })
  })

app.route('/delete/:id')
  .get((req, res) => {
    var id = req.params.id;

    db.collection('data').deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return console.log(err);
      console.log('Registro excluído com sucesso.');
      res.redirect('/show');
    })
  })


