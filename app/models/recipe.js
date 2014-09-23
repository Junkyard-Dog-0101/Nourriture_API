// app/models/recipe.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Recipe', RecipeSchema);
