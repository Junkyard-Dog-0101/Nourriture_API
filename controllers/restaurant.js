var Bill = require('../models/bill');
var Restaurant = require('../models/restaurant');
var User = require('../models/user');
var Dish = require('../models/dish');
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

function restaurantSave(restaurant, req, res) {
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

exports.addUserToMyRestaurant = function (req, res) {
    User.update({_id: req.body.user_id}, {restaurant: req.user.restaurant}, function (err, user) {
        if (err)
            res.status(400).json(err);
        else if (!user)
            res.status(404).end();
        else
            res.status(204).json(user);
    });
};

exports.addDishToMyRestaurant = function (req, res) {
    Dish.update({_id: req.body.dish_id}, {restaurant: req.user.restaurant}, function (err, dish) {
        if (err)
            res.status(400).json(err);
        else if (!dish)
            res.status(404).end();
        else
            res.status(204).json(dish);
    });
};

exports.deleteDishToMyRestaurant = function (req, res) {
    Dish.update({_id: req.body.dish_id}, {restaurant: null}, function (err, dish) {
        if (err)
            res.status(400).json(err);
        else if (!dish)
            res.status(404).end();
        else
            res.status(204).json(dish);
    });
};

exports.getRestaurantDishes = function (req, res) {
    Dish.find({restaurant: req.params.restaurant_id}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else
            res.status(200).json(dishes);
    });
};

exports.payDish = function (req, res) {
    Restaurant.find({_id: req.params.restaurant_id}, function (err, dishes) {
        if (err)
            res.status(400).json(err);
        else {
            Dish.find({_id: req.params.dish_id}, function (err, dishes) {
                if (err)
                    res.status(400).json(err);
                else {
                    var bill = new Bill({
                        to: req.body.restaurant_id,
                        dish: req.body.dish_id,
                        from: req.user._id
                    });
                    bill.save(function (err) {
                        if (err)
                            res.status(400).json(err);
                        else
                            res.status(201).json(bill);
                    });
                }

            });
        }
    });
};

//add people to my restaurant
//add dish to the restaurant
//paid a food from a costumer of my restaurant
