var User = require('../models/user');

exports.postUsers = function (req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    email: req.body.email
  });
  user.save(function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(201).json(user);
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
  User.find({ _id: req.params.user_id }, function (err, user) {
    if (err)
      res.status(400).json(err);
    else if (!user[0])
      res.status(404).end();
    else
      res.status(200).json(user);
  });
};

exports.putUser = function (req, res) {
  Comment.update({ _id: req.user._id }, { password: req.body.password }, function (err, num, raw) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
};

exports.deleteUser = function (req, res) {
  Comment.remove({ _id: req.params.user_id }, function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
}
