var mongoose = require('mongoose');

var LikeSchema = new mongoose.Schema({
    like: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    share: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dish: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
        required: true
    }
});

module.exports = mongoose.model('Like', LikeSchema);
