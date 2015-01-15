'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PChangePwdCtrl
 * @description
 * # PChangePwdCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PChangePwdCtrl', function ($scope) {
  	$scope.$watch('newPass2',function  (newValue, oldValue) {
  		if ($scope.newPass1!==$scope.newPass2) {
  			$scope.message="error";
  		}else{
  			$scope.message="success";
  		};
  		
  	});
  	  $scope.$watch('newPass1',function  (newValue, oldValue) {
  		if ($scope.newPass2!==$scope.newPass1) {
  			$scope.message="error";
  		}else{
  			$scope.message="success";
  		};
  		
  	});
  });
