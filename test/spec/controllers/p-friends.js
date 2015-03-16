'use strict';

describe('Controller: PFriendsCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var PFriendsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PFriendsCtrl = $controller('PFriendsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
