'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PNotificationNewCtrl
 * @description
 * # PNotificationNewCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PNotificationNewCtrl', function ($scope,$http,$location,localStorageService) {
  	$scope.noid=$location.search().id;
  	$scope.sendmessage=function  () {
	  	$http({
	  		method:'PUT',
	  		url:'api/notifications/'+$scope.noid,
	  		data:"content="+$scope.content+
	  		"&read="+true,
	  	headers:{
	                    'Content-Type': 'application/x-www-form-urlencoded',
	              }
	  	}).success(function  () {
	  		$scope.message="success";
	  		$location.path('/p-notifications');
	  	}).error();
  	};

  });
