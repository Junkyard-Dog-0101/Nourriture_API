var Friend = require('../models/friend');

exports.postFriends = function (req, res) {
  var friend = new Friend();
  friend.content = req.body.content;
  friend.from = req.body.from;
  friend.to = req.body.to;
  friend.save(function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(201).json(friend);
  });
};

exports.validateFriendRequest = function (req, res) {
  Friend.update({ from: req.body.from, to: req.user._id }, { status: "accept" }, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (!friend)
      res.status(404).end();
    else
      res.status(200).json(friend);
    });
};

exports.getMyFriendRequest = function (req, res) {
  Friend.find({to: req.params.friend_id, status: "accept"}, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (!friend)
      res.status(404).end();
    else
      res.status(200).json(friend);
  });
};

exports.getMyFriend = function (req, res) {
  Friend.find({ $and: [
    { to: req.user._id, status: "accept" },
    { from: req.user._id, status: "accept" }
  ]}, function (err, friend) {
    if (err)
      res.status(400).json(err);
    else if (!friend)
      res.status(404).end();
    else
      res.status(200).json(friend);
  });
};

/*exports.deleteFriend = function (req, res) {
    Friend.remove({from: req.body.friend_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};*/
