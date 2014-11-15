var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    content: String,
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Message', MessageSchema);