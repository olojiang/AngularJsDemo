"use strict";

var myModule = angular.module('myModule', []);

/**
 * Value
 * - Can be any types
 * - Can be object
 * - It's like constant
 * - Can not be parameterized
 */
myModule.value("value1", 'hello ng value');
myModule.value("value2", true);
myModule.value("value3", 5555);
myModule.value("value4", {name: 'Ji Wei', age: 33});

/**
 * Constant
 * - It's almost like value
 * - Only difference is that config(), run() method can use constant, but not value
 */
myModule.constant("const1", 'hello const');
myModule.config(function (const1) {
    console.info("const1:", const1);
});

myModule.controller("myController", ['$scope', 'value1', 'value2', 'value3', 'value4', 'const1',
    function ($scope, value1, value2, value3, value4, const1) {
    $scope.value = value1;
    $scope.value2 = value2;
    $scope.value3 = value3;
    $scope.value4 = value4;

    $scope.const1 = const1;
}]);

/**
 * config()
 * - it can only be injected with constant
 * - can use constant to configure Provider.
 * - config() phase will not have any other service executed yet, such as value, service, factory.
 */
myModule.config(['const1', function (const1) {

}]);

/**
 * run()
 * - it can only be injected with constant
 */
myModule.run(['const1', function (const1) {

}]);