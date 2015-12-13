"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    $scope.styleObjInScope = {
        fontSize: '12px',
        color: 'red',
        padding: '10px',
        border: '1px solid #efefef',
        marginTop: '10px'
    };

    $scope.classObjectInScope = "red strike";

    $scope.classObjectInScope2 = "border bold";
}]);