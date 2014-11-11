// app/models/rank.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RankSchema = new Schema({
    star: {
        type: String,
        enum: ['1', '2', '3', '4', '5']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Rank', RankSchema);
