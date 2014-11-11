// app/models/ingredient.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
    name: String,
    descrption: String,
    location: String,
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
