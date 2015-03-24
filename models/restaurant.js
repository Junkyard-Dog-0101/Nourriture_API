var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ''
    },
    account: {
        type: Number,
        default: 0
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    introduction: {
        type: String,
        default: 'This restaurant don\'t have any description'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        default: ''
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }]
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);
