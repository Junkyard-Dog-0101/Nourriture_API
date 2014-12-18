var Dish = require('../models/dish');

exports.postDishes = function (req, res) {
    var dish = new Dish();
    dish.name = req.body.name;
    dish.description = req.body.description;
    dish.user = req.user._id;
    dish.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(dish);
    });
};

exports.getDishes = function (req, res) {
    Dish.find({}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dishes);
    });
};

exports.getDish = function (req, res) {
    Dish.find({_id: req.params.dish_id}, function (err, dish) {
        if (err)
            res.status(400).json(err);
        else if (!dish)
            res.status(404).end();
        else
            res.status(200).json(dish);
    });
};

exports.putDish = function (req, res) {
    Dish.update({_id: req.params.dish_id}, {
        name: req.body.name,
        description: req.body.description
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteDish = function (req, res) {
    Dish.remove({_id: req.params.dish_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
