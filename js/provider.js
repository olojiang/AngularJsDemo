"use strict";

var myModule = angular.module('myModule', []);

/**
 * Provider
 * - return provider object
 * - provider object has $get attribute, which is a factory method.
 * - provider and its $get() return object, are 2 different object
 * - $get can return anything like factory method can
 * - It's can be config(), but the factory can not
 */
myModule.provider("myProvider1", function () {
    // Configure $get()
    this.$get = [function () {
        return 'string returned by provider';
    }];
});

myModule.provider("myProvider2", function () {
    // Configure $get()
    this.$get = [function () {
        return {key: 'object value'};
    }];
});

myModule.constant("const1", 'Hello');
myModule.constant("const2", '//');

myModule.provider("my3", function () {
    // Configure $get() with constant
    this.$get = ['const2', function (const2) {
        return function() {
            return const2 + " It's comment";
        }
    }];
});

myModule.constant("const3", 'Rock');

myModule.provider("my4", function () {
    var prefix = '===';
    this.definePrefix = function (input) {
        prefix = input;
    };

    this.$get = ['const3', function (const3) {
        return function sayHello(input) {
            return prefix + const3 + ': ' + input;
        };
    }];
});

// config(), mast has the Provider suffix, which is not the $get() return object
myModule.config(['my4Provider', function (my4Provider) {
    my4Provider.definePrefix('[*] ');
}]);

myModule.controller("myController", function ($scope, myProvider1, myProvider2, my3, my4) {
    $scope.value1 = myProvider1;
    $scope.value2 = myProvider2.key;
    $scope.value3 = my3();
    $scope.value4 = my4('Yun Jia Li');
});