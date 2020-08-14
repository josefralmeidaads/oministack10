const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema')

//Schema e a entidade do banco
const Devschema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});

module.exports = mongoose.model('Dev', Devschema); // passo o arquivo model e a entidade do model