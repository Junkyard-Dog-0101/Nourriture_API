'use strict';

/**
 * @ngdoc overview
 * @name webNourritureApp
 * @description
 * # webNourritureApp
 *
 * Main module of the application.
 */
angular.module('Authentication', []);
angular
  .module('webNourritureApp', [
    'Authentication',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
     'ui.sortable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        hideMenus: true
      })
      .when('/dish', {
        templateUrl: 'views/dish.html',
        controller: 'DishCtrl'
      })
      .when('/p-dishes', {
        templateUrl: 'views/p-dishes.html',
        controller: 'PDishesCtrl'
      })
      .when('/p-personal-info', {
        templateUrl: 'views/p-personal-info.html',
        controller: 'PPersonalInfoCtrl'
      })
      .when('/p-change-pwd', {
        templateUrl: 'views/p-change-pwd.html',
        controller: 'PChangePwdCtrl'
      })
      .when('/dishes', {
        templateUrl: 'views/dishes.html',
        controller: 'DishesCtrl'
      })
      .when('/alldishes', {
        templateUrl: 'views/alldishes.html',
        controller: 'AlldishesCtrl'
      })
      .when('/p-dishes', {
        templateUrl: 'views/p-dishes.html',
        controller: 'PDishesCtrl'
      })
      .when('/dishes', {
        templateUrl: 'views/dishes.html',
        controller: 'DishesCtrl'
      })
      .when('/p-my-dishes', {
        templateUrl: 'views/p-my-dishes.html',
        controller: 'PMyDishesCtrl'
      })
      .when('/p-notifications', {
        templateUrl: 'views/p-notifications.html',
        controller: 'PNotificationsCtrl'
      })
      .when('/p-notification-new', {
        templateUrl: 'views/p-notification-new.html',
        controller: 'PNotificationNewCtrl'
      })
      .when('/p-notification-send', {
        templateUrl: 'views/p-notification-send.html',
        controller: 'PNotificationSendCtrl'
      })
      .when('/p-notification-out', {
        templateUrl: 'views/p-notification-out.html',
        controller: 'PNotificationOutCtrl'
      })
      .when('/p-signin', {
        templateUrl: 'views/p-signin.html',
        controller: 'PSigninCtrl'
      })
      .when('/friends', {
        templateUrl: 'views/friends.html',
        controller: 'FriendsCtrl'
      })
      .when('/p-friends', {
        templateUrl: 'views/p-friends.html',
        controller: 'PFriendsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })  
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            /*if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/index');
            }*/
        });
    }]);
