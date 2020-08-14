const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true, //torna o campo obrigatório
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

module.exports = PointSchema;