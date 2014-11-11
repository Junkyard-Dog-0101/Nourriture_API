// app/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    introduction: {type: String,default:"The one is too lazy to write anything."},
    registrationDate: { type: Date, default: Date.now },
    gender: {
        type:String,
        enum:['male','female']
    },
    status: {
        type:String,
        enum:['default','other']
    },
    role: {
        type: String,
        enum: ['normal', 'foodSupplier', 'gastronomist', 'admin']
    },
    picture: [{
        type: Schema.Types.ObjectId,
        ref: 'Picture'
    }],
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
