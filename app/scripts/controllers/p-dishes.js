'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:PDishesCtrl
 * @description
 * # PDishesCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('PDishesCtrl', function ($scope,$http,$window) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //获取dish
      $http.get('api/getMyDishes').success(function  (data) {
     $scope.recipelist=data;
  });
/*$scope.detail=function  (id,index) {
  $scope.recipelist.splice(index,1);
    $http.delete('api/recipes/'+id).success(function  (status) {        
    });
  };*/
  });

