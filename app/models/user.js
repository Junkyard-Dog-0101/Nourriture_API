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
        role: {
            type: String,
            enum: ['normal', 'foodSupplier', 'gastronomist']
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
    })
    ;

module.exports = mongoose.model('User', UserSchema);
