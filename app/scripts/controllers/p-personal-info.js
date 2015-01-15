'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PPersonalInfoCtrl
 * @description
 * # PPersonalInfoCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PPersonalInfoCtrl', function ($rootScope,$scope,$http,$window) {
  	if ($rootScope.globals.currentUser) {
  		$scope.username=$window.sessionStorage['username'];
 	 	$scope.userid=$window.sessionStorage['userid'];
 	 	$http.get('api/users/'+$scope.userid).success(function  (data) {
 	 		$scope.currentUser=data[0];
 	 	});
  	}; 

  	$scope.modify=function  () {
	 	$http({
	                method: 'PUT',
	                url: 'api/users/'+$scope.userid,
	                data:  "username="+$scope.currentUser.username+
	                "&first_name="+$scope.currentUser.firstName+
	                "&last_name="+$scope.currentUser.lastName+
	                "&gender="+$scope.currentUser.gender+
	                "&email="+$scope.currentUser.email,
	                headers:{
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                }
	            }).success(function  (data,status,headers,config) {
	                $scope.message='register success';
	                $window.location.reload();
	            })
	            .error(function (data, status, headers, config) {
	                $scope.message='register error';
	            });
  	} ; 

  });
