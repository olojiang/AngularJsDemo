"use strict";

describe('Test Angular Service',function(){
    // Get module
    beforeEach(angular.mock.module('myModule3'));

    // Setup the mock service for service in an anonymous module.
    beforeEach(angular.mock.module(function ($provide) {
        // Mock service
        $provide.service('otherService', function(){
            this.value = 77;
        });

        // Mock predefined service.
        // - implement function, with spy
        $provide.service('$window', function(){
            this.alert = jasmine.createSpy('alert1');
        });
    }));

    // After we have provider for factory, we can have the factory injected
    it('Service method', angular.mock.inject(function($window, myService){
        expect(myService).toBeDefined();
        console.info("myService:", myService);

        // Call service function
        myService.showMessage("test");
        myService.showMessage("test");
        myService.showMessage("test");

        // Called function
        expect($window.alert).toHaveBeenCalled();
        expect($window.alert).toHaveBeenCalledTimes(3);

        // Check value of service in service
        expect(myService.service.value).toEqual(77);
    }));
});