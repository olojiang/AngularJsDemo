"use strict";

var myModule = angular.module('myModule', []);

/**
 * Factory
 * - it's a creation function
 * - create singleton object, function
 * - once created, the return value will be re-use
 * - can inject with value and other things
 */
myModule.factory('myFactory', function () {
    return function(){
        return new Date();
    };
});

// Can inject with value
myModule.value("valueX", 777);
myModule.factory('myFactory2', function (valueX) {
    return "ValueX: " + valueX;
});

myModule.controller("myController", ['$scope', 'myFactory', 'myFactory2', function ($scope, myFactory, myFactory2) {
    $scope.date = myFactory();
    $scope.value = myFactory2;

}]);