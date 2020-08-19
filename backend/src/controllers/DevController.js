const axios = require('axios'); //axios permite realizar chamadas de outras API
const Dev = require('../models/Dev')
const ParseStringAsArray = require('../utils/ParseStringAsArray')

//index para ver varios
// show para buscar um elemento
// create para criar um elemento
// destroy para remover um elemento
// update para alterar um registro

module.exports = {
    
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async delete (request, response) {
        const { github_username } = request.body;
        await Dev.findOneAndRemove({github_username})
        return response.json({message: 'User deleted successfully'});
    },
    
    


    async update (request, response) {
        const {github_username} = request.body;

        dev = await Dev.findOne({ github_username });

        console.log(dev);
        
        if(dev){ //se meu dev existir

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      
            const {name , avatar_url, bio} = apiResponse.data; //desistruturando o data para pegar somente os dados que preciso
         
            const techsArray = ParseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.update({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });

            response.json({message:'Usuário Alterado Com Sucesso!'});
        } else {
            response.json({message:'Usuário Não Encontrado!'});
        }
    },

    async store(request, response){
        let indice = 0
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });
        
        if(!dev){ //se meu dev não existir
            indice++;

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      
            const {name = login, avatar_url, bio} = apiResponse.data; //desistruturando o data para pegar somente os dados que preciso
         
            const techsArray = ParseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        
            dev = await Dev.create({
                indice,
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });

        }

        return response.json(dev);
    }

   
}