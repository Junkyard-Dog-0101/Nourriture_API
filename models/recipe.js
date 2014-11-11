// app/models/recipe.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    name: String,
    description: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
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
    ranks: [{
        type: Schema.Types.ObjectId,
        ref: 'Rank'
    }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
