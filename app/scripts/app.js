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
  .config(['$routeProvider', '$locationProvider',  function ($routeProvider, $locationProvider) {
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
        templateUrl: 'views/p-signin.html',
        controller: 'LoginController',
        hideMenus: true
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
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
      .when('/p-add-dishes', {
        templateUrl: 'views/p-add-dishes.html',
        controller: 'PAddDishesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])  
.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.url('/login');
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}])
  .run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]).controller('HeaderController',
     ['$rootScope','$scope', '$http', '$location',  '$cookieStore','$window', 'AuthenticationService',
     function ($rootScope,$scope,$http, $location, $cookieStore,$window,AuthenticationService) {

      if($rootScope.globals.currentUser){
         $scope.isLogIn=true;
          $scope.username= $window.sessionStorage['username'];
          $scope.userid=$window.sessionStorage['userid'];
      }else{
        $scope.isLogIn=false;
      }

      $scope.logout=function  () {
        delete $window.sessionStorage['userid'];
        delete $window.sessionStorage['username'];
        $scope.isLogIn=false;
        AuthenticationService.ClearCredentials();
        $window.location.reload();
      };
      
     
    }]);
