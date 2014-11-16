var mongoose = require('mongoose');

var RankSchema = new mongoose.Schema({
    star: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        required: true
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
        enum: ['dish', 'ingredient', 'recipe']
    }
});

module.exports = mongoose.model('Rank', RankSchema);