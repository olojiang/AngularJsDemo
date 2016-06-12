"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    $scope.greeting = "Hello";
    $scope.userInput = "Hunter";

    $scope.sayHello = function () {
        $scope.greeting = "Hello " + $scope.userInput;
    };
}]);