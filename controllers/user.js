var User = require('../models/user');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postUsers = function (req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        gender: req.body.gender,
        email: req.body.email
    });
    if (req.body.picture != undefined) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        user.picture = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                user.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(user);
                });
            }
        });
    }
    else {
        user.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(user);
        });
    }
};

exports.login = function (req, res) {
    User.find({_id: req.user._id}, function (err, users) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
};

exports.getUsers = function (req, res) {
    User.find(function (err, users) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
};

exports.getUser = function (req, res) {
    User.find({_id: req.params.user_id}, function (err, user) {
        if (err)
            res.status(400).json(err);
        else if (!user[0])
            res.status(404).end();
        else
            res.status(200).json(user);
    });
};

exports.putUser = function (req, res) {
    Comment.update({_id: req.user._id}, {password: req.body.password}, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteUser = function (req, res) {
    Comment.remove({_id: req.params.user_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
