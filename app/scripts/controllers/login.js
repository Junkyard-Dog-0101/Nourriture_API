'use strict';
  
angular.module('Authentication')
  
.controller('LoginController',
    ['$scope', '$rootScope', '$location','$http','$window','AuthenticationService',
    function ($scope, $rootScope, $location, $http,$window, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
        delete $window.sessionStorage['userid'];
        delete $window.sessionStorage['username'];
        $scope.message='message';
        $scope.login = function () {
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $window.sessionStorage['userid']=response[0]._id;
                    $window.sessionStorage['username']=response[0].username;
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                }
            });
        };

          $scope.register=function  () {
            $http({
                method: 'POST',
                url: 'api/register',
                data:  "username="+$scope.username+"&password="+$scope.password,
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function  (data,status,headers,config) {
                $scope.message='register success';
            })
            .error(function (data, status, headers, config) {
                $scope.message='register error';
            });
        };

    }]);