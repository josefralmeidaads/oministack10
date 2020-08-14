const {Router} = require('express');
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
const routes = Router();


routes.delete('/devs/:id', (request, response) => {
    console.log(request.params);
    return response.json({message: 'Usuário Incluído'});
});

routes.post('/devs', DevController.store);

routes.get('/devs', DevController.index); // pesquisa de Devs

routes.get('/search', SearchController.index); // pesquisa de Dev por localização e Tecnologia

/* Para que o meu módulo index veja as minhas rotas e as exporto */
module.exports = routes;

