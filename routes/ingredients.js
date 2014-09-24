var express = require('express');
var Ingredient = require('../app/models/ingredient');
var router = express.Router();


router.route('/')
    .post(function(req, res) {
	var ingredient = new Ingredient();
	ingredient.name = req.body.name;
	ingredient.save(function(err) {
	    if (err)
		res.send(err);
	    res.json({ message: 'Ingredient created!' });
	});
    })
    .get(function(req, res) {
	Ingredient.find(function(err, ingredients) {
	    if (err)
		res.send(err);
	    res.json(ingredients);
	});
    });

router.route('/:ingredient_id')
    .get(function(req, res) {
	Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
	    if (err)
		res.send(err);
	    res.json(ingredient);
	});
    })
    .put(function(req, res) {
	Ingredient.findById(req.params.ingredient_id, function(err, ingredient) {
	    if (err)
		res.send(err);
	    ingredient.name = req.body.name;
	    ingredient.save(function(err) {
		if (err)
		    res.send(err);
		res.json({ message: 'Ingredient updated!' });
	    });
	});
    })
    .delete(function(req, res) {
	Ingredient.remove({
	    _id: req.params.ingredient_id
	}, function(err, ingredient) {
	    if (err)
		res.send(err);
	    res.json({ message: 'Successfully deleted' });
	});
    });

module.exports = router;
