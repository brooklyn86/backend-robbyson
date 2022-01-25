const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');
var cors         = require('cors')
const consign = require('consign/lib/consign');

module.exports = () => {
  const app = express();
  console.log(encodeURI(config.get('database.password')))
  
  app.set('port', process.env.PORT || config.get('server.port'));

  app.use(bodyParser.json(), cors());

  consign({
      cwd : 'src'
  })
  .then('models')
  .then('controllers')
  .then('routes')
  .into(app);

  return app;
};