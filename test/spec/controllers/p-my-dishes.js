'use strict';

describe('Controller: PMyDishesCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var PMyDishesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PMyDishesCtrl = $controller('PMyDishesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
