// app/models/healthProblem.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HealthProblemSchema = new Schema({
    name: String,
    description: String,
    pictures: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }]
});

module.exports = mongoose.model('HealthProblem', HealthProblemSchema);
