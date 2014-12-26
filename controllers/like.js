var Like = require('../models/like');
var Notification = require('../models/notification');
var Dish = require('../models/dish');

exports.postLikes = function (req, res) {
    var like = new Like();
    like.like = req.body.like;
    like.dish = req.body.dish;
    like.share = req.body.share;
    like.user = req.user._id;
    var notification = new Notification();
    notification.content = "new like on your dish";
    notification.target = req.body.dish;
    notification.targetType = 'dish';
    Dish.find({_id: req.body.dish}, function (err, dish) {
        if (err)
            res.status(400).json(err);
        else if (!dish[0])
            res.status(404).end();
        else {
            like.save(function (err) {
                if (err)
                    res.status(400).json(err);
                else {
                    notification.user = dish[0]["user"];
                    notification.save();
                    res.status(201).json(like);
                }
            });
        }
    });
};

exports.getLikes = function (req, res) {
    Like.find(function (err, likes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(likes);
    });
};

exports.getLikesFromDish = function (req, res) {
    Like.find({dish: req.params.dish_id}, function (err, like) {
        if (err)
            res.status(400).json(err);
        else if (!like)
            res.status(404).end();
        else
            res.status(200).json(like);
    });
};

exports.getLike = function (req, res) {
    Like.find({_id: req.params.like_id}, function (err, like) {
        if (err)
            res.status(400).json(err);
        else if (!like)
            res.status(404).end();
        else
            res.status(200).json(like);
    });
};

exports.deleteLike = function (req, res) {
    Like.remove({user: req.user._id, _id: req.params.like_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
