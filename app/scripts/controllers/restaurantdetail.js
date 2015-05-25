'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:RestaurantdetailCtrl
 * @description
 * # RestaurantdetailCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('RestaurantdetailCtrl', function ($scope,$http,$routeParams) {
    $http.get('api/getRestaurantDishes/'+$routeParams.id).success(function (data) {
      $scope.dishes = data;
    });
    
    $scope.detail=function  ($id) {
          $http.get('api/dishes/'+$id).success(function  (data) {
            $scope.detailInfo=data[0];
            $http.get('api/getCommentsFromDish/'+$id).success(function  (data) {
                $scope.commentList=data;
                $scope.users=[];
                for (var i = 0; i <$scope.commentList.length; i++) {
                  $http.get('api/users/'+ $scope.commentList[i].user)
                  .success(function  (data) {
                    $scope.users.splice(1,0,{name:data[0].username});
                  }).error();
                };
            }).error();
          }).error();
        };
        //made comment
        $scope.comment=function  () {
          $http({
            method:'POST',
            url:'api/comments',
            data:"content="+$scope.content+
            "&dish="+$scope.detailInfo._id,
            headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
              }
          }).success(function  (data) {
            $http.get('api/getCommentsFromDish/'+data.dish).success(function  (data) {
                $scope.commentList=data;
                for (var i = 0; i < $scope.commentList.length; i++) {
                  $http.get('api/users/'+ $scope.commentList[i].user)
                  .success(function  (data) {
                    $scope.users.splice(1,0,{name:data[0].username});
                  }).error();
                };
            }).error();
          }).error();
        };
        
        $scope.buy=function () {
          
        }
});
