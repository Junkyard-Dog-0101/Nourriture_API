'use strict';

/**
 * @ngdoc function
 * @name webNourritureApp.controller:BillCtrl
 * @description
 * # BillCtrl
 * Controller of the webNourritureApp
 */
angular.module('webNourritureApp')
  .controller('BillCtrl', function ($scope,$http) {
    //get my bills
    $http.get('api/getMyBill/').success(
        function  (data) {
          $scope.bills=data;   
          for (var i = 0; i < data.length; i++) {
            //get restaurant info
            $http.get('api/restaurants/' + data[i].to).success(function (data1) {
                $scope.restaurants=data1[0];
//                console.log($scope.restaurants[i]);
            }).error();
            //get dish info
            $http.get('api/dishes/'+data[i].dish).success(function  (data2) {
              $scope.dishes=data2[0];
//               console.log($scope.dishes[i]);
            }).error();        
          }  
        }
      ).error(function  () {
          $scope.message="failed";
      });
  });
