'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('RecipeCtrl', function ($scope,$http,$routeParams) {
    	$http.get('api/recipes/'+$routeParams.id)
    	.success(function (data){
    		$scope.detail=data[0];
    		$http.get('api/users/'+$scope.detail.user)
    		.success(function  (data) {
    			if (data[0]) {
    				$scope.author=data[0].username;
    			} else{
    				$scope.author='anonymous';
    			};
    			
    		});
    	}).error(function  (data) {
    		$scope.detail='error';
    	});

    	$scope.modifyRecipe=function  () {
    		$http({
    			method:'PUT',
    			url:'api/recipes/'+$routeParams.id,
    			data:"name="+$scope.detail.name+"&description="+$scope.detail.description,
    			 headers:{
                		'Content-Type': 'application/x-www-form-urlencoded'
        			}
    		}).success(function  (data,status) {
    			if (status==204) {
    				$scope.message='success!';
    			}
    		});
    	};
  });
