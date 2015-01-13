var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var qt = require('quickthumb');
var path=require('path');

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
    .get(dishController.getMyDishes);

router.route('/getCommentsFromDish/:dish_id')
    .get(commentController.getCommentsFromDish);

router.route('/getLikesFromDish/:dish_id')
    .get(likeController.getLikesFromDish);

router.route('/sendFriendRequest')
    .post(friendController.sendFriendRequest);
router.route('/validateFriendRequest')
    .put(friendController.validateFriendRequest);
router.route('/getMyFriend')
    .get(friendController.getMyFriend);
router.route('/getMyFriendRequest')
    .get(friendController.getMyFriendRequest);
router.route('/deleteFriend')
    .delete(friendController.deleteFriend);

router.route('/getReceivedMessage')
    .get(messageController.getReceivedMessage);
router.route('/getSendedMessage')
    .get(messageController.getSendedMessage);
router.route('/sendMessage')
    .post(messageController.sendMessage);
router.route('/getConversation/:user_id')
    .get(messageController.getConversation);

router.route('/getMyNotifications/')
    .get(notificationController.getMyNotifications);
router.route('/getMyUnreadNotifications/')
    .get(notificationController.getMyUnreadNotifications);
router.route('/readNotification/')
    .put(notificationController.readNotification);

router.route('/login')
    .post(authController.isAuthenticated, userController.login);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers);

router.route('/users/:user_id')
    .get(userController.getUser)
    .put(userController.putUser)
    .delete(userController.deleteUser);

router.route('/notifications/:notification_id')
    .put(notificationController.putNotification);
//.delete(authController.isAuthenticated, adminGroup(), notificationController.deleteNotification);
//.get(notificationController.getNotification)

router.route('/notifications')
    .get(notificationController.getNotifications);
// .post(authController.isAuthenticated, notificationController.postComments)

router.route('/likes/:like_id')
    .get(likeController.getLike)
    .delete(likeController.deleteLike);

router.route('/likes')
    .post(likeController.postLikes)
    .get(likeController.getLikes);


router.route('/comments/:comment_id')
    .get(commentController.getComment)
    .put(commentController.putComment)
    .delete(commentController.deleteComment);

router.route('/comments')
    .post(commentController.postComments)
    .get(commentController.getComments);

router.route('/ingredients/:ingredient_id')
    .get(ingredientController.getIngredient)
    .put(ingredientController.putIngredient)
    .delete(ingredientController.deleteIngredient);

router.route('/ingredients')
    .post(ingredientController.postIngredients)
    .get(ingredientController.getIngredients);

router.route('/dishes/:dish_id')
    .get(dishController.getDish)
    .put(dishController.putDish)
    .delete(dishController.deleteDish);

router.route('/dishes')
    .post(dishController.postDishes)
    .get(dishController.getDishes);

router.route('/problems/:problem_id')
    .get(problemController.getProblem)
    .put(problemController.putProblem)
    .delete(problemController.deleteProblem);

router.route('/problems')
    .post(problemController.postProblems)
    .get(problemController.getProblems);

app.use('/api', router);

app.listen(port);
