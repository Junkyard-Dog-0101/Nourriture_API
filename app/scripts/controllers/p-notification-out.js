'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PNotificationOutCtrl
 * @description
 * # PNotificationOutCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PNotificationOutCtrl', function ($scope,$http,$window) {
	$http.get('api/getMyNotifications/').success(function  (data) {
            		$scope.notificationlist=data;
            		$scope.number=$scope.notificationlist.length;
          	}).error();
  });
