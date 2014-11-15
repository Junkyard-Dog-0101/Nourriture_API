var Comment = require('../models/comment');

exports.postComments = function (req, res) {
    var comment = new Comment();
    comment.content = req.body.content;
    comment.share = req.body.share;
    comment.user = req.user._id;
    comment.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(comment);
    });
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
    Comment.update({
        user: req.user._id,
        _id: req.params.comment_id
    }, {content: req.body.content}, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteComment = function (req, res) {
    Comment.remove({user: req.user._id, _id: req.params.comment_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
