var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    content: {
	type: String,
	required: true
    },
    date: { type: Date, default: Date.now },
    share: { type: Boolean, default: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
	required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
