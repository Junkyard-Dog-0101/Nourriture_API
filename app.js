var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var userController = require('./controllers/user');
var commentController = require('./controllers/comment');
var messageController = require('./controllers/message');
var ingredientController = require('./controllers/ingredient');
var dishController = require('./controllers/dish');
var problemController = require('./controllers/problem');
var authController = require('./controllers/auth');
var notificationController = require('./controllers/notification');
var friendController = require('./controllers/friend');

var adminGroup = function () {
    return function (req, res, next) {
        if (req.user.admin == true)
            next();
        else
            res.status(401).json('Unauthorized');
    };
};

var port = process.env.PORT || 1337;

var app = express();

mongoose.connect('127.0.0.1:27017');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(passport.initialize());

var router = express.Router();

router.route('/sendFriendRequest')
    .post(authController.isAuthenticated, friendController.sendFriendRequest);
router.route('/validateFriendRequest')
    .put(authController.isAuthenticated, friendController.validateFriendRequest);
router.route('/getMyFriend')
    .get(authController.isAuthenticated, friendController.getMyFriend);
router.route('/getMyFriendRequest')
    .get(authController.isAuthenticated, friendController.getMyFriendRequest);
router.route('/deleteFriend')
    .delete(authController.isAuthenticated, friendController.deleteFriend);

router.route('/getReceivedMessage')
    .get(authController.isAuthenticated, messageController.getReceivedMessage);
router.route('/getSendedMessage')
    .get(authController.isAuthenticated, messageController.getSendedMessage);
router.route('/sendMessage')
    .post(authController.isAuthenticated, messageController.sendMessage);

router.route('/getMyNotifications/')
    .get(authController.isAuthenticated, notificationController.getMyNotifications);
router.route('/getMyUnreadNotifications/')
    .get(authController.isAuthenticated, notificationController.getMyUnreadNotifications);
router.route('/readNotification/')
    .put(authController.isAuthenticated, notificationController.readNotification);

router.route('/login')
    .post(authController.isAuthenticated, userController.login);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, adminGroup(), userController.deleteUser);

router.route('/notifications/:notification_id')
    .put(authController.isAuthenticated, notificationController.putNotification);
//.delete(authController.isAuthenticated, adminGroup(), notificationController.deleteNotification);
//.get(notificationController.getNotification)

router.route('/notifications')
    .get(notificationController.getNotifications);
// .post(authController.isAuthenticated, notificationController.postComments)

router.route('/comments/:comment_id')
    .get(commentController.getComment)
    .put(authController.isAuthenticated, commentController.putComment)
    .delete(authController.isAuthenticated, commentController.deleteComment);

router.route('/comments')
    .post(authController.isAuthenticated, commentController.postComments)
    .get(commentController.getComments);

router.route('/ingredients/:ingredient_id')
    .get(ingredientController.getIngredient)
    .put(authController.isAuthenticated, adminGroup(), ingredientController.putIngredient)
    .delete(authController.isAuthenticated, adminGroup(), ingredientController.deleteIngredient);

router.route('/ingredients')
    .post(authController.isAuthenticated, adminGroup(), ingredientController.postIngredients)
    .get(ingredientController.getIngredients);

router.route('/dishes/:dish_id')
    .get(dishController.getDish)
    .put(authController.isAuthenticated, dishController.putDish)
    .delete(authController.isAuthenticated, dishController.deleteDish);

router.route('/dishes')
    .post(authController.isAuthenticated, dishController.postDishes)
    .get(dishController.getDishes);

router.route('/problems/:problem_id')
    .get(problemController.getProblem)
    .put(authController.isAuthenticated, adminGroup(), problemController.putProblem)
    .delete(authController.isAuthenticated, adminGroup(), problemController.deleteProblem);

router.route('/problems')
    .post(authController.isAuthenticated, problemController.postProblems)
    .get(problemController.getProblems);

app.use('/api', router);

app.listen(port);
