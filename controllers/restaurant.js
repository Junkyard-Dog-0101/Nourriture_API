var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Chance = require('chance');
var fs = require('fs-extra');

exports.postRestaurants = function (req, res) {
    var restaurant = new Restaurant({
        restaurantName: req.body.restaurantName,
        introduction: req.body.introduction,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });
    if (req.body.picture != undefined) {
        var my_chance = new Chance();
        var guid = my_chance.guid();
        restaurant.picture = "app/uploads/" + guid + ".png";
        var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('app/uploads/' + guid + '.png', base64Data, 'base64', function (err) {
            if (err)
                res.status(400).json(err);
            else {
                restaurantSave(restaurant, req, res);
                }
            });
        }
    else {
        restaurantSave(restaurant, req, res)
    }
};

function restaurantSave(restaurant, req, res)
{
    restaurant.save(function (err) {
        if (err)
            res.status(400).json(err);
        else {
            User.update({_id: req.user._id}, {restaurant: restaurant._id}, function (err, numberAffected, rawResponse) {
                if (err)
                    res.status(400).json(err);
                else if (numberAffected == 0)
                    res.status(404).end();
                else {
                    res.status(201).json(restaurant);
                }
            });
        }
    });
}

exports.getRestaurants = function (req, res) {
    Restaurant.find(function (err, users) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(users);
    });
};

exports.AddToMyRestaurant = function (req, res) {
    /*var restaurant = new Restaurant({
        user: req.body.restaurantName,
        introduction: req.body.introduction,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });*/

    User.update({_id: req.body.user_id}, {restaurant: req.user.restaurant}, function (err, user) {
        if (err)
            res.status(400).json(err);
        else if (!user)
            res.status(404).end();
        else
            res.status(204).json(user);
    });

/*    User.find({_id: req.user._id}, function (err, user) {
        if (err)
            res.status(400).json(err);
        else if (!user)
            res.status(404).end();
        else
            res.status(200).json(user);
    });*/
};

//add people to my restaurant
//add dish to the restaurant
//paid a food from a costumer of my restaurant
