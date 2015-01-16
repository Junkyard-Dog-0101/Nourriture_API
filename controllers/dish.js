var Dish = require('../models/dish');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postDishes = function (req, res) {
    var dish = new Dish();
    dish.name = req.body.name;
    dish.description = req.body.description;
    dish.ingredients = req.body.ingredients;
    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        dish.picture = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('app/uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                dish.user = req.user._id;
                dish.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(dish);
                });
            }
        });
    }
    else {
        dish.user = req.user._id;
        dish.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(dish);
        });
    }
};

exports.getMyDishes = function (req, res) {
    Dish.find({user: req.user._id}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dishes);
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
        else if (!dish[0])
            res.status(404).end();
        else
            res.status(200).json(dish);
    });
};

exports.putDish = function (req, res) {
    Dish.update({_id: req.params.dish_id, user: req.user._id}, {
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
    Dish.remove({_id: req.params.dish_id, user: req.user._id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
