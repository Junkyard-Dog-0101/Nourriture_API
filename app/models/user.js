// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    login: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: String,
    email: String,
    phoneNumber: String,
    registrationDate: Date,
    friends: [userId: {
	type: Schema.Types.ObjecId,
        ref: 'User'
    }, status: {
	type: String, enum: ['normal', 'block', 'blocked', 'request', 'requested']
    }],
    healthProblems: [{
	type: Schema.Types.ObjecId,
	ref: 'HealthProblem'
    }],
    EthicsReligions: [{
	type: Schema.Types.ObjecId,
	ref: 'EthicReligion'
    }],
    Introduction: String
});

module.exports = mongoose.model('User', UserSchema);
