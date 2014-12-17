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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['online', 'away', 'offline'],
    default: 'offline'
  },
  phoneNumber: {
    type: String,
    default: null
  },
  introduction: {
    type: String,
    default: 'Sorry, I don\'t have any description so I got the default one'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['normal', 'foodSupplier', 'gastronomist'],
    default: 'normal'
  },
  picture: {
    type: String,
    default: null
  },
  problems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Problem'
  }]
});

/*UserSchema.path('email').validate(function (v, fn) {
  if (v == undefined)
    next(false);
  else
  {
    if (v.indexOf('@') > -1)
      next(true);
    else
      next(false);
  }
}, 'invalid email format');*/

UserSchema.pre('save', function(callback) {
  var user = this;
  if (!user.isModified('password'))
    return callback();
  bcrypt.genSalt(5, function(err, salt) {
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
  delete obj.__v;
  return obj
};

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err)
      return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
