var Bill = require('../models/bill');

exports.getMyBill = function (req, res) {
    Bill.find({from: req.user._id}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dishes);
    });
};

exports.deleteMyBill=function (req,res) {
    Bill.remove({_id: req.params.bill_id, user: req.user._id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};