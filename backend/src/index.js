const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes') // quando for arquivo deve se passar caminho relativo

const app = express(); //Criação da aplicação

mongoose.connect('mongodb+srv://arrowgamer:arrowgamer@cluster0.7qksd.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // usamos o use para se referir a todo tipo de METODO HTTP, e para o express entender o arquivo JSON, informamos ao express para atender requisições do tipo JSON

///para minha aplicação utilizar minhas rotas do routes
app.use(routes);

///Métodos HTTP GET, POST, PUT, DELETE

///Tipos de parâmetros
/*
   Query params: request.query(Filtros, ordenação, paginação...)
   Route params: request.param(identificar um recurso na alteração, remoção)
   Body: body(são dados para criação ou alteração de um registro)
*/


app.listen('3333');