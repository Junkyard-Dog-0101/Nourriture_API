var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    targetType: {
        type: String,
        enum: ['message', 'dish', 'recipe', 'friend', 'like'],
        required: true
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);