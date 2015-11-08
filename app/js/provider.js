"use strict";

var myModule = angular.module('myModule', []);

/**
 * Provider
 * - return provider object
 * - provider object has $get attribute, which is a factory method.
 * - $get can return anything like factory method can
 */
myModule.provider("myProvider1", function () {
    var provider = {};

    provider.$get = function () {

        return 'String value from provider';
    };

    return provider;
});

myModule.provider("myProvider2", function () {
    var provider = {};

    provider.$get = function () {

        return {key: 'object value'};
    };

    return provider;
});

myModule.provider("myProvider3", function () {
    var provider = {};

    provider.$get = function () {
        
        return function(){
            return 'value3';
        };
    };

    return provider;
});


myModule.controller("myController", function ($scope, myProvider1, myProvider2, myProvider3) {
    $scope.value1 = myProvider1;
    $scope.value2 = myProvider2.key;
    $scope.value3 = myProvider3();
});