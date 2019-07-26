const dataRepository = require('../repositories/data-repository')
const dataModel = require('../models/data-model')
const _repo = new dataRepository()

function dataController() { }

dataController.prototype.get = async (req, res) => {
  try {
    _repo.getAll().then(function (result) {
      res.status(200).render('../views/show.ejs', { data: result })
    })
  } catch (error) {
    console.log('Erro:dataController.get: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

dataController.prototype.getById = async (req, res) => {
  try {
    let resultado = await _repo.getById(req.params.id)
    console.log("resultado: ", resultado)
    res.status(200).render('../views/edit.ejs', { data: resultado })
    return resultado
  } catch (error) {
    console.log('Erro:dataController:getById: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

dataController.prototype.post = async (req, res) => {
  try {
    console.log(req.body)
    // let result = await _repo.create(data);
    console.log('usando o método post no form HTML')
    _repo.create(req.body)
    res.status(200).redirect('/api/data')

  } catch (error) {
    console.log('Erro:dataController.post: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

dataController.prototype.put = async (req, res) => {
  try {
    _repo.update(req.params.id, req.query).then(function (result) {
      console.log("result:", result)
    })
    res.status(200).redirect('/api/data')
  } catch (error) {
    console.log('Erro:dataController.put: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: error });
  }
}

dataController.prototype.delete = async (req, res) => {
  try {
    console.log(req.params.id)
    _repo.delete(req.params.id).then(function (result) {
      console.log('Informação removida com sucesso: ', result)
      res.status(200).redirect('/api/data/');
    })
  } catch (error) {
    console.log('Erro:dataController.delete: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

dataController.prototype.actionView = async (req, res) => {
  try {
    console.log(req.params.id)
    let modelo = await _repo.getById(req.params.id)
    res.status(200).render('../views/view.ejs', { data: modelo });

  } catch (error) {
    console.log('Erro:dataController.actionView: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

dataController.prototype.actionUpdate = async (req, res) => {
  try {
    console.log(req.params.id)
    let modelo = await _repo.getById(req.params.id)
    res.status(200).render('../views/edit.ejs', { data: modelo });

  } catch (error) {
    console.log('Erro:dataController.actionView: ', error);
    res.status(500).send({ message: 'Erro no processamento', error: err });
  }
}

module.exports = dataController