'use strict';

describe('Controller: RestaurantdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var RestaurantdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestaurantdetailCtrl = $controller('RestaurantdetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
