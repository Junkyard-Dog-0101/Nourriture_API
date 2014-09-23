// app/models/ingredient.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
