var Message = require('../models/message');
var Notification = require('../models/notification');

exports.sendMessage = function (req, res) {
    var message = new Message();
    message.content = req.body.content;
    message.from = req.user._id;
    message.to = req.body.to;
    var notification = new Notification();
    notification.content = "you received a new message";
    notification.target = req.user._id;
    notification.targetType = "message";
    notification.user = req.body.to;

    message.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
        {
            notification.save(function (err) {
                if (err)
                    res.status(400).json(err);
                else {

                    res.status(201).json(message);
                }
            });
        }
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
