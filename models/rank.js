var mongoose = require('mongoose');

var RankSchema = new mongoose.Schema({
    star: {
        type: String,
        enum: ['1', '2', '3', '4', '5']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Rank', RankSchema);