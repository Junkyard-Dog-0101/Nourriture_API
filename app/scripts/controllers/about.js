'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('AboutCtrl', ['MyService',function (MyService,$scope) {
    $scope.customers = MyService.getCustomers();
	$scope.todos=['Item1','Item2','Item3'];
        $scope.image = null
        $scope.imageFileName = ''
 	$scope.addTodo = function () {
 		if ($scope.todo) {
 			$scope.todos.push($scope.todo);
  	 		$scope.todo = '';
  	 	} else{
  	 		$scope.todo = '';
  	 	};
 	 
  	};
  	$scope.removeTodo=function(index){
  		$scope.todos.splice(index,1);
  	}
}]);