var express = require('express');
var User = require('../app/models/user');
var passport = require('passport');
var router = express.Router();


router.route('/')
    .post(function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'User created!'});
        });
    })
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
router.route('/toto')
    .get(function (req, res) {
        if (!req.isAuthenticated()) {
            return res.json({message: "WRONG"});
        }
        Recipe.find(function (err, recipes) {
            if (err)
                res.send(err);
            res.json(recipes);
        });
    });


router.route('/register')
    .get(function(req, res) {
	res.render('register', { });
    })
    .post(function (req, res) {
	User.register(new User({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
		return res.send(err);//render("register", {info: "Sorry. That username already exists. Try again."});
            }
	    
            passport.authenticate('local')(req, res, function () {
		res.json({message: 'User created and logged in'});
            });
	});
    });
router.route('/login')
    .get(function(req, res) {
	res.json({ message : req.user });
    })

    .post(passport.authenticate('local'), function(req, res) {
	res.json({message: 'User logged in'});
    });

router.route('/logout')
    .get(function(req, res) {
	req.logout();
	res.json({message: 'User logged out'});
    });


router.route('/:user_id')
    .get(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    .put(function (req, res) {
        User.findById(req.params.user_id, function (err, user) {
            if (err)
                res.send(err);
            user.name = req.body.name;
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'User updated!'});
            });
        });
    })
    .delete(function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    });

module.exports = router;
