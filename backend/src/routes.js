const {Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();
const axios = require('axios')
const Dev = require('../src/models/Dev')

routes.put('/devs', DevController.update);

routes.delete('/devs', DevController.delete);

routes.post('/devs', DevController.store);

routes.get('/devs', DevController.index); // pesquisa de Devs

routes.get('/search', SearchController.index); // pesquisa de Dev por localização e Tecnologia

/* Para que o meu módulo index veja as minhas rotas e as exporto */
module.exports = routes;

