var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var userController = require('./controllers/user');
var commentController = require('./controllers/comment');
var messageController = require('./controllers/message');
var ingredientController = require('./controllers/ingredient');
var authController = require('./controllers/auth');
var adminController = require('./controllers/admin');

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

router.route('/register')
    .post(userController.register);

router.route('/users')
//  .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);


/*router.route('/recipes')
    .post(authController.isAuthenticated, recipeController.postRecipes)
    .get(recipeController.getRecipes);

router.route('/recipes/:recipe_id')
    .get(recipeController.getRecipe)
    .put(authController.isAuthenticated, recipeController.putRecipe)
    .delete(authController.isAuthenticated, recipeController.deleteRecipe);

router.route('/dishes')
    .post(authController.isAuthenticated, dishController.postDishes)
    .get(dishController.getDishes);

router.route('/dishes/:dish_id')
    .get(dishController.getDish)
    .put(authController.isAuthenticated, dishController.putDish)
    .delete(authController.isAuthenticated, dishController.deleteDish);
*/
router.route('/comments/:comment_id')
    .get(commentController.getComment)
    .put(authController.isAuthenticated, commentController.putComment)
    .delete(authController.isAuthenticated, commentController.deleteComment);

router.route('/comments')
    .post(authController.isAuthenticated, commentController.postComments)
    .get(commentController.getComments);

router.route('/ingredients/:comment_id')
    .get(ingredientController.getIngredient)
    .put(adminController.isAdmin, ingredientController.putIngredient)
    .delete(adminController.isAdmin, ingredientController.deleteIngredient);

router.route('/ingredients')
    .post(adminController.isAdmin, ingredientController.postIngredients)
    .get(ingredientController.getIngredients);

app.use('/api', router);

app.listen(port);
