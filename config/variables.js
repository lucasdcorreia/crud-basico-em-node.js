const variables = {
  Api: {
    port: process.env.port || 4000
  },
  Database: {
    connection: "mongodb://admin:admin123@ds255107.mlab.com:55107/crud_tutorial"
  },
  Security: {
    secretyKey: 'd41d8cd98f00b204e9800998ecf8427e'
  }
}

module.exports = variables;