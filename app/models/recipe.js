// app/models/recipe.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: String,
    ingredients:[{
	type: Schema.Types.ObjectId,
	ref: 'Ingredient'
    }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
