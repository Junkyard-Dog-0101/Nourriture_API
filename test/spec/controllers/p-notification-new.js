'use strict';

describe('Controller: PNotificationNewCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var PNotificationNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PNotificationNewCtrl = $controller('PNotificationNewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
