var mongoose = require('mongoose');

var DishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
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
    type: String,
    default: 'Recipe string'
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  problems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }],
  pictures: [String]
});

module.exports = mongoose.model('Dish', DishSchema);
