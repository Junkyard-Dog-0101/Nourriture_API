var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient'
    }],
    pictures: [String],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    ranks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rank'
    }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);