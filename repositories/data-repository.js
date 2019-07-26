const dataModel = require('../models/data-model')
const mongoose = require('mongoose')


class dataRepository {
  constructor() {
    this._model = dataModel
  }

  async create(data) {
    let modelo = new this._model(data);
    let resultado = await modelo.save();
    return resultado;
  }

  async update(id, data) {
    await this._model.findByIdAndUpdate(id, { $set: data });
    let resultado = await this._model.findById(id);
    return resultado;
  }

  async getAll() {
    return await this._model.find()
  }

  async getById(id) {
    return await this._model.findById(id);
  }

  async delete(id) {
    return await this._model.findByIdAndRemove(id);
  }
}

module.exports = dataRepository