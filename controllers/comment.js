var Comment = require('../models/comment');
var Notification = require('../models/notification');
var Recipe = require('../models/recipe');
var Dish = require('../models/dish');

exports.postComments = function (req, res) {
  var comment = new Comment();
  comment.content = req.body.content;
  comment.target = req.body.target;
  comment.targetType = req.body.targetType;
  comment.share = req.body.share;
  comment.user = req.user._id;
  var notification = new Notification();
  notification.content = "new comment on your " + req.body.targetType;
  notification.target = req.body.target;
  notification.targetType = req.body.targetType;
  if (req.body.targetType == "dish") {
    Dish.find({_id: req.body.target}, function (err, dish) {
      if (err)
        res.status(400).json(err);
      else {
        notification.user = dish[0]["user"];
        comment.save(function (err) {
          if (err)
            res.status(400).json(err);
          else {
            res.status(201).json(comment);
            notification.save();
          }
        });
      }
    });
  }
  else if (req.body.targetType == "recipe") {
    Recipe.find({_id: req.body.target}, function (err, recipe) {
      if (err)
        res.status(400).json(err);
      else {
        notification.user = recipe[0]["user"];
        comment.save(function (err) {
          if (err)
            res.status(400).json(err);
          else {
            notification.save();
            res.status(201).json(comment);
          }
        });
      }
    });
  }
};

exports.getComments = function (req, res) {
  Comment.find({share: true}, function (err, comments) {
    if (err)
      res.status(400).json(err);
    else
      res.status(200).json(comments);
  });
};

exports.getComment = function (req, res) {
  Comment.find({_id: req.params.comment_id}, function (err, comment) {
    if (err)
      res.status(400).json(err);
    else if (!comment)
      res.status(404).end();
    else
      res.status(200).json(comment);
  });
};

exports.putComment = function (req, res) {
  Comment.update({ user: req.user._id, _id: req.params.comment_id }, { content: req.body.content }, function (err, num, raw) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
};

exports.deleteComment = function (req, res) {
  Comment.remove({ user: req.user._id, _id: req.params.comment_id }, function (err) {
    if (err)
      res.status(400).json(err);
    else
      res.status(204).end();
  });
};
