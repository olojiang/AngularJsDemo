"use strict";

describe('Test Angular Factory', function () {
  // Get module
  beforeEach(angular.mock.module('myModule2'));

  // Setup the mock service or provider for factory in an anonymous module.
  beforeEach(angular.mock.module(function ($provide) {
    // Mockup constant value
    $provide.value('oneOfMyOtherProvider', {
      someVariable: 77
    });
  }));

  // After we have provider for factory, we can have the factory injected
  it('Factory method', angular.mock.inject(function (myFactory) {
    expect(myFactory).toBeDefined();
    console.info("myFactory:", myFactory);

    // Check system provider or service
    var logObj = myFactory.logObj;
    expect(logObj).toBeDefined();
    logObj.error("Test error()");

    // Check mocked provider
    expect(myFactory.service.someVariable).toEqual(77);
  }));
});