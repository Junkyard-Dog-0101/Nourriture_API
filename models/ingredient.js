var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
