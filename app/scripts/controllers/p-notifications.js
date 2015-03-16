'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PNotificationsCtrl
 * @description
 * # PNotificationsCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PNotificationsCtrl', function ($scope,$http,$window,localStorageService) {
	// var notificationInStore = localStorageService.get('notificationlist');

 //      	$scope.notificationlist=notificationInStore||[];
 //      	$scope.number=$scope.notificationlist.length;
 //      	$scope.$watch('notificationlist', function () {
 //            		localStorageService.set('notificationlist', $scope.notificationlist);
 //          	}, true);

      	$http.get('api/getMyUnreadNotifications/').success(function  (data) {
            		$scope.notificationlist=data;
            		$scope.number=$scope.notificationlist.length;
          	}).error();

      	$scope.deletemsg=function  ($id) {
      		$http({
      			method:'PUT',
      			url:'api/readNotification/',
      			data:"notification_id="+$id,
      			headers:{
	                    'Content-Type': 'application/x-www-form-urlencoded',
	              }
      		}).success().error();
      		}
  });
