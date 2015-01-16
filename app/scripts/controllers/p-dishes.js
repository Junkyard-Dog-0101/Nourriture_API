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
    //get my dishes
    //add dish
    $scope.userid=$window.sessionStorage['userid'];
        $scope.addDish=function  () {
          $http({
            method: 'POST',
            url:'api/dishes',
            data:"name="+$scope.dishName+
            "&description="+$scope.description,
            headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'user._id':$scope.user
                }
          }).success(function  (data) {
              $scope.dishes=data[0];
          }).error();
        }
    
  });

