'use strict';

describe('Controller: DishesCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var DishesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DishesCtrl = $controller('DishesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
