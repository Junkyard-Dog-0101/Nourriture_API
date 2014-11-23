var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    firstName: String,
    lastName: String,
    gender: Boolean,
    email: String,
    status: Boolean,
    phoneNumber: String,
    introduction: String,
    registrationDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['normal', 'foodSupplier', 'gastronomist']
    },
    picture: String,
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, {
        type: String,
        enum: ['normal', 'block', 'blocked', 'request', 'requested']
    }]
});

UserSchema.pre('save', function (callback) {
    var user = this;
    if (!user.isModified('password'))
        return callback();
    bcrypt.genSalt(5, function (err, salt) {
        if (err)
            return callback(err);
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return callback(err);
            user.password = hash;
            callback();
        });
    });
});


UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.admin;
    return obj
};

UserSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);