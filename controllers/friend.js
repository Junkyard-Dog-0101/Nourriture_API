var Friend = require('../models/friend');
var Notification = require('../models/notification');

exports.sendFriendRequest = function (req, res) {
  var friend = new Friend();
  friend.content = req.body.content;
  friend.from = req.user._id;
  friend.to = req.body.friend_id;
  friend.save(function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(201).json(friend);
  });
};

exports.validateFriendRequest = function (req, res) {
  Friend.update({ from: req.body.friend_id, to: req.user._id, status: 'request' }, { status: 'accept' }, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (friend.toString() == '0')
      res.status(404).end();
    else {
      var notification = new Notification();
      notification.user = req.body.friend_id
      notification.content = 'new friend';
      notification.target = req.user._id;
      notification.targetType = 'friend';
      notification.save();
      res.status(204).end();
    }
  });
};

exports.getMyFriendRequest = function (req, res) {
  Friend.find({to: req.user._id, status: 'request'}, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (!friend[0])
      res.status(404).end();
    else
      res.status(200).json(friend);
  });
};

exports.getMyFriend = function (req, res) {
  Friend.find({ $or: [
  { to: req.user._id, status: 'accept' },
  { from: req.user._id, status: 'accept' }
  ] }, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (!friend[0])
      res.status(404).end();
    else
      res.status(200).json(friend);
  });
};

exports.deleteFriend = function (req, res) {
  Friend.remove({ $or: [
  { to: req.user._id, from: req.body.friend_id, status: 'accept' },
  { from: req.user._id, to: req.body.friend_id, status: 'accept' }
  ] }, function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
};

exports.deleteFriendRequest = function (req, res) {
  Friend.remove({ to: req.user._id, from: req.body.friend_id, status: 'request' }, function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
};
