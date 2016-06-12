/**
 * Created by Hunter on 4/1/2016.
 */
"use strict";


describe("Test $resource Factory", function () {
  // Get module
  beforeEach(module('myModuleResource'));
  var scope;
  var controller;

  var $httpBackend;

  beforeEach(inject(function (_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('myController', {$scope: scope});

    expect(scope).toBeDefined();
    expect(controller).toBeDefined();
  }));

  describe("Test $resource works", function () {
    // $resource get
    it("get()", inject(function (Users) {
      // Construct fake data
      $httpBackend.expectGET('api/entries/111')
        .respond(200, {
          value: '777'
        });

      // Query one
      var entry = Users.get({id: '111'}, function () {
        expect(entry.value).toEqual('777');
      }); // get() returns a single entry

      // Send back the fake data
      $httpBackend.flush();

      // Verify the $httpBackend has been used
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }));

    it("query()", inject(function (Users) {
      // Construct fake data
      $httpBackend.expectGET('api/entries')
        .respond(200, [{
          value: '777'
        }, {
          value: '222'
        }]);

      // Query all
      var entry = Users.query(function () {
        expect(entry[1].value).toEqual('222');
      }); // get() returns a single entry

      // Send back the fake data
      $httpBackend.flush();

      // Verify the $httpBackend has been used
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }));

    it("save()", inject(function (Users) {
      // Construct fake data
      $httpBackend.expectPOST('api/entries', {id: 1, name: 'Ji Wei'})
        .respond(200, {status: true, msg: 'save successfully'});

      // Create
      var user = new Users();
      user.id = 1;
      user.name = 'Ji Wei';
      user.$save(function (response) {
        expect(response.status).toEqual(true);
        expect(response.msg).toEqual('save successfully');
      }); // get() returns a single entry

      // Send back the fake data
      $httpBackend.flush();

      // Verify the $httpBackend has been used
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }));
  });
});