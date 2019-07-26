const mongoose = require('mongoose');
const uri = "mongodb://admin:admin123@ds255107.mlab.com:55107/crud_tutorial";

module.exports = mongoose.connect(uri, { useNewUrlParser: true });
