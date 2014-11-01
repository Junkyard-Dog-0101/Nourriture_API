// app/models/healthProblem.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HealthProblemSchema = new Schema({
    name: String,
    description: String,
    Pictures: [{
	type: Schema.Types.ObjecId,
	ref: 'Picture'
    }]
});

module.exports = mongoose.model('HealthProblem', HealthProblemSchema);
