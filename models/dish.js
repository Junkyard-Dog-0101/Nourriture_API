var mongoose = require('mongoose');

var DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        default: 'No recipe'
    },
    picture: {
        type: String,
        default: null
    },
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
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }]
});

DishSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v;
    return obj
};

module.exports = mongoose.model('Dish', DishSchema);
