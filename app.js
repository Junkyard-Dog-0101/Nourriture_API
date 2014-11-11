var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var userController = require('./controllers/user');
//var recipeController = require('./controllers/recipe');
var messageController = require('./controllers/message');
//var ingredientController = require('./controllers/ingredient');
var authController = require('./controllers/auth');

var port = process.env.PORT || 1234;

var app = express();

mongoose.connect('127.0.0.1:27017');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

var router = express.Router();

router.route('/getReceivedMessage')
    .get(authController.isAuthenticated, messageController.getReceivedMessage);

router.route('/getSendedMessage')
    .get(authController.isAuthenticated, messageController.getSendedMessage);

router.route('/sendMessage')
    .post(authController.isAuthenticated, messageController.sendMessage);

/*router.route('/users/:user_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);*/

router.route('/register')
    .post(userController.register)

router.route('/users')
//  .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

app.use('/api', router);

app.listen(port);
