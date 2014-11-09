// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    gender: Boolean,
    email: String,
    status: Boolean,
    phoneNumber: String,
    introduction: String,
    registrationDate: { type: Date, default: Date.now },
    role: {
        type: String,
        enum: ['normal', 'foodSupplier', 'gastronomist', 'admin']
    },
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    },
    healthProblems: [{
        type: Schema.Types.ObjectId,
        ref: 'HealthProblem'
    }],
    ethicsReligions: [{
        type: Schema.Types.ObjectId,
        ref: 'EthicReligion'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, {
        type: String,
        enum: ['normal', 'block', 'blocked', 'request', 'requested']
    }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
