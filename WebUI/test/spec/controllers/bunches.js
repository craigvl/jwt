'use strict';

describe('Controller: BunchesCtrl', function () {

  // load the controller's module
  beforeEach(module('jwtApp'));

  var BunchesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BunchesCtrl = $controller('BunchesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
