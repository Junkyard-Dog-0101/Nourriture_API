var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  login: String,
  password: String,
  name: String,
  email: String,
  phoneNumber: String,
  introduction: String,
  registrationDate: date,
  pictures: [String],
  dishes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish'
  }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
