"use strict";

describe('Test Angular Service', function () {
  // Get module
  beforeEach(angular.mock.module('myModule4'));

  var element, compiledElement, outerScope, innerScope;

  // Setup the mock service for service in an anonymous module.
  beforeEach(inject(function ($rootScope, $compile) {
    outerScope = $rootScope.$new();
    expect(outerScope).toBeDefined();

    element = angular.element('<my-directive label="myLabel" click="myCallback()"></my-directive>');
    compiledElement = $compile(element)(outerScope);
    outerScope.$digest();

    innerScope = compiledElement.isolateScope();
    expect(innerScope).toBeDefined();
  }));

  describe('label', function () {
    describe('label should be rendered', function () {
      beforeEach(function () {
        outerScope.$apply(function () {
          outerScope.myLabel = "Ji Wei";
        });
      });

      it('Should find h3 has myLabel Content', function () {
        expect(element[0].children[0].innerHTML).toEqual('Ji Wei');
      });
    });
  });

  describe("onClick", function () {
    var spy;
    beforeEach(function () {
      outerScope.$apply(function () {
        spy = jasmine.createSpy('outerCallback');
        outerScope.myCallback = spy;
      });
    });

    describe("trigger click", function () {
      beforeEach(function () {
        var event = document.createEvent("MouseEvent");
        event.initEvent("click", true, true);
        element[0].dispatchEvent(event);
      });

      it("onClick trigger for the directive", function () {
        expect(outerScope.myCallback).toBeDefined();
        expect(spy).toBeDefined();
        expect(innerScope.callback).toBeDefined();
        expect(spy).toHaveBeenCalled();
      });
    });
  });

});