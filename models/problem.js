var mongoose = require('mongoose');

var ProblemSchema = new mongoose.Schema({
    name: String,
    type: {
        type: String,
        enum: ['ethic', 'health', 'religion']
    },
    description: String,
    picture: String
});

module.exports = mongoose.model('Problem', ProblemSchema);