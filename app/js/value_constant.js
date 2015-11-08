"use strict";

var myModule = angular.module('myModule', []);

/**
 * Value
 * - Can be any types
 * - It's like constant
 */
myModule.value("value1", 'hello ng value');
myModule.value("value2", true);
myModule.value("value3", 5555);

/**
 * Constant
 * - It's almost like value
 * - Only difference is that config method can use constant, but not value
 */
myModule.constant("const1", 'hello const');
myModule.config(function (const1) {
    console.info("const1:", const1);
});

myModule.controller("myController", ['$scope', 'value1', 'value2', 'value3', 'const1', function ($scope, value1, value2, value3, const1) {
    $scope.value = value1;
    $scope.value2 = value2;
    $scope.value3 = value3;
    $scope.const1 = const1;
}]);

