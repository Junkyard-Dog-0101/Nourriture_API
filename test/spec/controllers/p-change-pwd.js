'use strict';

describe('Controller: PChangePwdCtrl', function () {

  // load the controller's module
  beforeEach(module('webNourritureApp'));

  var PChangePwdCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PChangePwdCtrl = $controller('PChangePwdCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
