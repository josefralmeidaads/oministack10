const axios = require('axios'); //axios permite realizar chamadas de outras API
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')

//index para ver varios
// show para buscar um elemento
// create para criar um elemento
// destroy para remover um elemento
// update para alterar um registro

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async delete(request, response) {
        const { github_username } = request.params;
        
        let dev = await Dev.findOne({ github_username });
        
        if(dev){
            await Dev.findOneAndRemove({ github_username })
            return response.json({ message: 'User deleted successfully' });
        } else {
            return response.json({ message: 'User Not Deleted'});
        }
        
    },

    async update(request, response) {
        
        const { github_username, techs, latitude, longitude } = request.body;

        const filter = {github_username};
        
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data; //desistruturando o data para pegar somente os dados que preciso

            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

        const update = {
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location}
        
        let dev = await Dev.findOne({ github_username });

        if(!dev){

            return response.json('Cadastro de Dev Não Localizado')
            
        } else {
            await Dev.findOneAndUpdate(filter, update, {
                new: true
            });
            return response.json('Cadastro de Dev Atualizado');
        }
    
    },

    async store(request, response) {

        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) { //se meu dev não existir            

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data; //desistruturando o data para pegar somente os dados que preciso

            const techsArray = ParseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });

            //return response.json({ message: "Dev Cadastrado com Sucesso!"})

        } //else {
            //return response.json({ message: "Operação Não Realizada!"})
        //}

        return response.json(dev);
    }


}