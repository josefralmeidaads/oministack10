const axios = require('axios');
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')

module.exports = {
    async index(request, response) {
        // buscar por distância ???km ou 10km
        // buscar por tecnologia que o dev domina
        
        const {latitude,longitude, techs} = request.query;

        const techsArray = ParseStringAsArray(techs);

        const devs = await Dev.find({ // para informar os filtros informar um objeto
            techs: {
                $in: techsArray // vai retornar somente devs que tenha essas tecnologias
            },
            location: {
                $near: { // o near encontra objetos perto de uma localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000, //metros
                },
            },
        });

        return response.json(devs);
    }
}