// app/models/restaurant.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    login: String,
    password: String,
    name: String,
    email: String,
    phoneNumer: String,
    introduction: String,
    registrationDate: date,
    pictures: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }],
    dishes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, {
        type: String,
        enum: ['normal', 'block', 'blocked', 'request', 'requested']
    }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
