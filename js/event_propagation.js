"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    $scope.count = 0;

    // Self will always receive this
    $scope.$on('increaseEvent', function (event, param) {
        console.info("param:", param);
        $scope.count++;
    });

    $scope.up = function () {
        $scope.$emit('increaseEvent', 'paramUp');
    };

    $scope.down = function () {
        $scope.$broadcast('increaseEvent', 'paramDown');
    };
}]);