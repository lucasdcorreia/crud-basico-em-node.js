const app = require('./config/server')
const variables = require('./config/variables');
app.listen(variables.Api.port, () => {
  console.info(`Api inicializada com sucesso na porta ${variables.Api.port}.`);
});

