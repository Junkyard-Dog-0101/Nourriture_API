var User = require('../models/user');

exports.register = function(req, res) {
    var user = new User({
	username: req.body.username,
	password: req.body.password
    });
    user.save(function(err) {
	if (err)
	    res.status(400).json(err);
	else
	    res.status(201).json(user);
    });
};

exports.getUsers = function(req, res) {
    User.find(function(err, users) {
	if (err)
	    res.status(400).json(err);
	else
	    res.status(200).json(users);
    });
};
