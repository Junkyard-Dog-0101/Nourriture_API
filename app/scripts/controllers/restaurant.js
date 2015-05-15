'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:RestaurantCtrl
 * @description
 * # RestaurantCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('RestaurantCtrl', function ($scope, $http, $window) {
  //get my restaurants
  $http.get('api/restaurants/').success(
    function (data) {
      $scope.restaurants = data;
    }
    ).error(function () {
    $scope.message = "failed";
  });
  
  //add restaurant
  $scope.userid = $window.sessionStorage['userid'];
  $scope.addRestaurant = function () {
    $http({
      method: 'POST',
      url: 'api/restaurants',
      data: "restaurantName=" + $scope.restaurantName +
      "&introduction=" + $scope.introduction +
      "&phoneNumber=" + $scope.phoneNumber +
      "&email=" + $scope.email +
      "&picture=" + $scope.image,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).success(function (data) {
      $http.get('api/restaurants/').success(
        function (data) {
          $scope.restaurants = data;
        }
        ).error(function () {
        $scope.message = "failed";
      });
    }).error();
  };
  
  //detail information
  $scope.detail = function ($id) {
    $http.get('api/restaurants/' + $id).success(function (data) {
      $scope.detailInfo = data[0];
//      $http.get('api/getCommentsFromDish/' + $id).success(function (data) {
//        $scope.commentList = data;
//        $scope.users = [];
//        for (var i = 0; i < $scope.commentList.length; i++) {
//          $http.get('api/users/' + $scope.commentList[i].user)
//            .success(function (data) {
//            $scope.users.splice(1, 0, { name: data[0].username });
//          }).error();
//        };
//      }).error();
    }).error();
  };
  
  $scope.showAdd=function () {
    $http.get('api/getMyDishes/').success(
        function  (data) {
          $scope.dishes=data;
        }
      ).error(function  () {
          $scope.message="failed";
      });
  };
  
  $scope.add=function (myDishid) {
    $http(
      {
        method:'PUT',
        url:'api/addDishToMyRestaurant',
        data:"dish_id="+myDishid+
        "&price="+$scope.myDishPrice,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    ).success(
      function (data){
          $scope.message=data;
        }
    ).error(
      function () {
          $scope.message="failed";
      }
    );
  };
});
