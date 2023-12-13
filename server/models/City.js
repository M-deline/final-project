const { Schema } = require('mongoose');

const citySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
       
    },
    name: {
        type: String,
        
    },
    image: {
        type: String,
    },
    country: {
        type: String,
    },
    overallScore: {
        type: String,
       
    },
});

module.exports = citySchema;