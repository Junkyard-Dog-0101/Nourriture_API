// app/models/recipe.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: String,
    description: String,
    content: String,
    creationDate: Date,
    creator: {
	type: Schema.Types.ObjectId,
	ref: 'User'
    },
    ingredients: [{
	type: Schema.Types.ObjectId,
	ref: 'Ingredient'
    }],
    pictures: [{
	type: Schema.Types.ObjectId,
	ref: 'Picture'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    ranks: [rank: {
        type: String,
	enum: ['1', '2', '3', '4', '5']
    }, userId: {
	type: Schema.Types.ObjectId,
	ref: 'User'
    }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
