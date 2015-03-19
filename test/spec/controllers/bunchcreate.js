'use strict';

describe('Controller: BunchcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('jwtApp'));

  var BunchcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BunchcreateCtrl = $controller('BunchcreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
