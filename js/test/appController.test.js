"use strict";

describe('Test Angular Controller', function () {
  var scope;
  var controller;

  beforeEach(module('myModule1'));
  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('myController', {$scope: scope});

    expect(scope).toBeDefined();
  }));

  it('add 1+1 should get sum 2', function () {
    expect(scope.add(1, 1)).toEqual(2);
  });
});