var Ingredient = require('../models/ingredient');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postIngredients = function (req, res) {
    var ingredient = new Ingredient();
    ingredient.name = req.body.name;
    ingredient.description = req.body.description;
    if (!(req.body.picture === undefined)) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        ingredient.picture = "uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                ingredient.user = req.user._id;
                ingredient.save(function (err) {
                    if (err)
                        res.status(400).json(err);
                    else
                        res.status(201).json(ingredient);
                });
            }
        });
    }
    else {
        ingredient.user = req.user._id;
        ingredient.save(function (err) {
            if (err)
                res.status(400).json(err);
            else
                res.status(201).json(ingredient);
        });
    }
};

exports.getIngredients = function (req, res) {
    Ingredient.find({}, function (err, ingredients) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(ingredients);
    });
};

exports.getIngredient = function (req, res) {
    Ingredient.find({_id: req.params.ingredient_id}, function (err, ingredient) {
        if (err)
            res.status(400).json(err);
        else if (!ingredient)
            res.status(404).end();
        else
            res.status(200).json(ingredient);
    });
};

exports.putIngredient = function (req, res) {
    Ingredient.update({_id: req.params.ingredient_id}, {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        picture: req.body.picture
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteIngredient = function (req, res) {
    Ingredient.remove({_id: req.params.ingredient_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};
