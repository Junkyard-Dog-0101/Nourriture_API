// app/models/dish.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    healthProblems: [{
        type: Schema.Types.ObjectId,
        ref: 'HealthProblem'
    }],
    ethicsReligions: [{
        type: Schema.Types.ObjectId,
        ref: 'EthicReligion'
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

module.exports = mongoose.model('Dish', DishSchema);
