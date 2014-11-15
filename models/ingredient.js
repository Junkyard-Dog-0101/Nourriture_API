var mongoose = require('mongoose');

var IngredientSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    picture: [String]
});

module.exports = mongoose.model('Ingredient', IngredientSchema);