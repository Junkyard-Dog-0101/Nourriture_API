var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishSchema = new Schema({
    name: String,
    description: String,
    date: { type: Date, default: Date.now },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
	required: true
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
