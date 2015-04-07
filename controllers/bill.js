var bill = require('../models/bill');

exports.getMyBill = function (req, res) {
    Dish.find({restaurant: req.params.restaurant_id}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dishes);
    });
};