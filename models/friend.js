var mongoose = require('mongoose');

var FriendSchema = new mongoose.Schema({
    content: {
        type: String,
        default: "Hi, I want to be your friend"
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['accept', 'request'],
        required: true,
        default: "request"
    }
});

module.exports = mongoose.model('Friend', FriendSchema);