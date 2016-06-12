"use strict";

var myModule = angular.module('myModule', []);

myModule.value("valueX", 'valueX');

/**
 * Service is creating a singleton object under a specific module
 * - Singleton
 * - Object
 * - Can inject with other service
 * - Can inject with value
 */
myModule.service("myService", function (valueX) {
    this.item = 'item value[service]';
    this.valueX = valueX;
});

myModule.controller("myController", ['$scope', 'myService', function ($scope, myService) {
    console.info("myService:", myService);
    $scope.item = myService.item;
    $scope.valueX = myService.valueX;
}]);