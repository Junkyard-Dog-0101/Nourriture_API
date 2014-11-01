// app/models/dish.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DishSchema = new Schema({
    name: String,
    description: String,
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

module.exports = mongoose.model('Dish', DishSchema);
