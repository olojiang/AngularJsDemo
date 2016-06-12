"use strict";

describe('Test Angular $http', function () {
  // Get module
  beforeEach(angular.mock.module('myModule5'));

  // Inject $httpBackend
  var httpReq;
  var $httpBackend;

  beforeEach(inject(function (_$httpBackend_, _httpReq_) {
    $httpBackend = _$httpBackend_;
    httpReq = _httpReq_;
  }));

  describe("Test $http mock", function () {
    beforeEach(function () {
      $httpBackend.expectGET('http://it-ebooks-api.info/v1/search/JavaScript')
        .respond(200, {message: 'test message'});

      // Trigger $http request
      httpReq.sendMessage().then(function (response) {
        var data = response.data;
        expect(data.message).toEqual('test message');
      });

      // Send back the fake data
      $httpBackend.flush();
    });

    it("$httpBackend verify no outstanding error", function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  });
});