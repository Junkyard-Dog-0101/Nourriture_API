var Message = require('../models/message');

exports.sendMessage = function (req, res) {
    var message = new Message();
    message.content = req.body.content;
    message.from = req.user._id;
    message.to = req.body.to;
    message.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(message);
    });
};

exports.getReceivedMessage = function (req, res) {
    Message.find({to: req.user._id}, function (err, messages) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(messages);
    });
};

exports.getSendedMessage = function (req, res) {
    Message.find({from: req.user._id}, function (err, messages) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(messages);
    });
};
