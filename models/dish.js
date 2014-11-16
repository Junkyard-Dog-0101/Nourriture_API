var mongoose = require('mongoose');

var DishSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    pictures: [String]
});

module.exports = mongoose.model('Dish', DishSchema);