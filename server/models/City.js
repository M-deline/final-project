const { Schema } = require('mongoose');

const citySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    country: {
        type: String,
    },
    overallScore: {
        type: String,
        required: true,
    },
});

module.exports = citySchema;