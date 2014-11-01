// app/models/comment.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: String,
    creation: Date,
    picture: {
        type: Schema.Types.ObjecId,
        ref: 'Picture'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
