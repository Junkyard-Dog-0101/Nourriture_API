'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('IndexCtrl', function ($window,$scope) {
  	if ($window.sessionStorage['username']) {
  		$scope.user=$window.sessionStorage['username'];
  	}else{
  		$scope.user='Login';
  	};
    
  });
