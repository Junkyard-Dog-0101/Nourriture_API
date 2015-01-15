'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('RegisterCtrl',  
  	['$scope', '$rootScope', '$location','$http','$window','AuthenticationService',
    	function ($scope, $rootScope, $location, $http,$window, AuthenticationService) {
          $scope.register=function  () {
            $http({
                method: 'POST',
                url: 'api/users',
                data:  "username="+$scope.username+
                "&password="+$scope.password+
                "&first_name="+$scope.firstName+
                "&last_name="+$scope.lastName+
                "&gender="+$scope.gender+
                "&email="+$scope.email,
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
