'use strict';

describe('Controller: PNotificationOutCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var PNotificationOutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PNotificationOutCtrl = $controller('PNotificationOutCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
