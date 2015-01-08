'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('MainCtrl', function ($scope,$http,$window) {
  $scope.message='message';
  $scope.username=$window.sessionStorage['username'];
  $scope.userid=$window.sessionStorage['userid'];
  $http.get('api/recipes').success(function  (data) {
     $scope.recipelist=data;
  });
  $scope.addRecipe=function  () {
    $http({
      method:'POST',
      url:'api/recipes',
      data:"name="+$scope.recipename+"&description="+$scope.recipedesp,
      headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).success(function  () {
       $http.get('api/recipes').success(function  (data) {
      $scope.recipelist=data;
  });
    }).error(function  (data,status, headers, config) {
        $scope.recipelist='error';
    });
  };

$scope.remove=function  (id,index) {
  $scope.recipelist.splice(index,1);
    $http.delete('api/recipes/'+id).success(function  (status) {        
    });
  };

});
