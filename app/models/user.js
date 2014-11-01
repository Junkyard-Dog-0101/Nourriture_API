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
    status: Boolean,
    phoneNumber: String,
    introduction: String,
    registrationDate: Date,
    Role: {
        type: String,
	enum: ['normal', 'foodSupplier', 'gastronomist']
    },
    picture: {
        type: Schema.Types.ObjecId,
        ref: 'Picture'
    },
    healthProblems: [{
	type: Schema.Types.ObjecId,
	ref: 'HealthProblem'
    }],
    EthicsReligions: [{
	type: Schema.Types.ObjecId,
	ref: 'EthicReligion'
    }],
    friends: [userId: {
	type: Schema.Types.ObjecId,
	ref: 'User'
    }, status: {
	type: String,
	enum: ['normal', 'block', 'blocked', 'request', 'requested']
    }]
});

module.exports = mongoose.model('User', UserSchema);
