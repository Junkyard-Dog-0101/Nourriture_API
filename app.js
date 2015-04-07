var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path = require('path');

var userController = require('./controllers/user');
var commentController = require('./controllers/comment');
var likeController = require('./controllers/like');
var messageController = require('./controllers/message');
var ingredientController = require('./controllers/ingredient');
var dishController = require('./controllers/dish');
var problemController = require('./controllers/problem');
var authController = require('./controllers/auth');
var notificationController = require('./controllers/notification');
var friendController = require('./controllers/friend');
var restaurantController = require('./controllers/restaurant');
/* je faisais le controller faut que je test la création de restaurant*/

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
app.use(qt.static(__dirname + '/'));
mongoose.connect('127.0.0.1:27017');

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'app')));

var router = express.Router();

router.route('/getMyDishes/')
    .get(authController.isAuthenticated, dishController.getMyDishes);

router.route('/getCommentsFromDish/:dish_id')
    .get(commentController.getCommentsFromDish);

router.route('/getLikesFromDish/:dish_id')
    .get(likeController.getLikesFromDish);

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
router.route('/getConversation/:user_id')
    .get(authController.isAuthenticated, messageController.getConversation);

router.route('/getMyNotifications/')
    .get(authController.isAuthenticated, notificationController.getMyNotifications);
router.route('/getMyUnreadNotifications/')
    .get(authController.isAuthenticated, notificationController.getMyUnreadNotifications);
router.route('/readNotification/')
    .put(authController.isAuthenticated, notificationController.readNotification);

router.route('/addUserToMyRestaurant/')
    .put(authController.isAuthenticated, restaurantController.addUserToMyRestaurant);

router.route('/addDishToMyRestaurant/')
    .put(authController.isAuthenticated, restaurantController.addDishToMyRestaurant);

router.route('/deleteDishToMyRestaurant/')
    .put(authController.isAuthenticated, restaurantController.deleteDishToMyRestaurant);

router.route('/getRestaurantDishes/:restaurant_id')
    .get(restaurantController.getRestaurantDishes);

router.route('/payDish/')
    .post(authController.isAuthenticated, restaurantController.payDish);

router.route('/login')
    .post(authController.isAuthenticated, userController.login);

router.route('/restaurants')
    .post(authController.isAuthenticated, restaurantController.postRestaurants)
    .get(restaurantController.getRestaurants);

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

router.route('/likes/:like_id')
    .get(likeController.getLike)
    .delete(authController.isAuthenticated, likeController.deleteLike);

router.route('/likes')
    .post(authController.isAuthenticated, likeController.postLikes)
    .get(likeController.getLikes);


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
    .post(authController.isAuthenticated, ingredientController.postIngredients)
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
