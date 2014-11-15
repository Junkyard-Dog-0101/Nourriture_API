var Recipe = require('../models/recipe');

exports.postRecipes = function (req, res) {
    var recipe = new Recipe();
    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.user = req.user._id;
    recipe.save(function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(201).json(recipe);
    });
};

exports.getRecipes = function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(recipes);
    });
};

exports.getRecipe = function (req, res) {
    Recipe.find({_id: req.params.recipe_id}, function (err, recipe) {
        if (err)
            res.status(400).json(err);
        else if (!recipe)
            res.status(404).end();
        else
            res.status(200).json(recipe);
    });
};

exports.putRecipe = function (req, res) {
    Recipe.update({_id: req.params.recipe_id}, {
        name: req.body.name,
        description: req.body.description
    }, function (err, num, raw) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};

exports.deleteRecipe = function (req, res) {
    Recipe.remove({_id: req.params.recipe_id}, function (err) {
        if (err)
            res.status(400).json(err);
        else
            res.status(204).end();
    });
};