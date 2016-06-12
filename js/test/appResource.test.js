"use strict";

describe('Test Angular $resource',function(){
    // Get module
    beforeEach(angular.mock.module('myModule6'));

    // Inject $httpBackend
    var resourceReq;
    var $httpBackend;

    beforeEach(inject(function(_$httpBackend_, _resourceReq_) {
        $httpBackend = _$httpBackend_;
        resourceReq = _resourceReq_;
    }));

    describe("Test $resource mock", function() {
        beforeEach(function() {
            $httpBackend.expectGET('http://it-ebooks-api.info/v1/search/JavaScript')
                .respond(200, {users: ['Ji Wei', 'Yun Jia Li']});

            // Trigger $resource request
            // - It is important to realize that invoking a $resource object method
            // -- immediately returns an empty reference (object or array depending on isArray).
            // -- Once the data is returned from the server the existing reference is populated with the actual data.
            var data = resourceReq.get(function(){
                var users = data.users;
                expect(users[1]).toEqual('Yun Jia Li');
            });

            // Send back the fake data
            $httpBackend.flush();
        });

        it("$httpBackend verify no outstanding error", function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});