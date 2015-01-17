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
            if ($location.path()==='/register') {
              ;
            }else if ($location.path() !== '/login'&& !$rootScope.globals.currentUser) {
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
      
     
    }])
.directive('fileDropzone', function() {
    return {
      restrict: 'A',
      scope: {
        file: '=',
        fileName: '='
      },
      link: function(scope, element, attrs) {
        var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
        processDragOverOrEnter = function(event) {
          if (event != null) {
            event.preventDefault();
            //这里是自己改的代码，修改上传图片插件的央视
            $(".drop-here").html("Drag and Drop image here");
          }
          event.originalEvent.dataTransfer.effectAllowed = 'copy';
          return false;
        };
        validMimeTypes = attrs.fileDropzone;
        checkSize = function(size) {
          var _ref;
          if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
            return true;
          } else {
            alert("File must be smaller than " + attrs.maxFileSize + " MB");
            return false;
          }
        };
        isTypeValid = function(type) {
          if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
            return true;
          } else {
            alert("Invalid file type.  File must be one of following types " + validMimeTypes);
            return false;
          }
        };
        element.bind('dragover', processDragOverOrEnter);
        element.bind('dragenter', processDragOverOrEnter);
        return element.bind('drop', function(event) {
          var file, name, reader, size, type;
          if (event != null) {
            event.preventDefault();
            $(".dropzone").css("display","none");
            $(".img-upload").show();
          }
          reader = new FileReader();
          reader.onload = function(evt) {
            if (checkSize(size) && isTypeValid(type)) {
              return scope.$apply(function() {
                scope.file = evt.target.result.replace(/\+/g,'%2B');;                
                console.log(scope.file);
                if (angular.isString(scope.fileName)) {
                  return scope.fileName = name;
                }
              });
            }
          };
          file = event.originalEvent.dataTransfer.files[0];
          name = file.name;
          type = file.type;
          size = file.size;
          reader.readAsDataURL(file);
          return false;
        });
      }
    };
  })
    ;
