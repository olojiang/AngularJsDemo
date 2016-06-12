/**
 * Created by Hunter on 5/30/2016.
 */
"use strict";

var myModule = angular.module('myModule', []);

myModule.controller("myController", ['$scope', function ($scope) {
    // Fake data of list
    $scope.provinces = [
        {Code: 1, Name: "四川"},
        {Code: 2, Name: "西藏"},
        {Code: 3, Name: "新疆"}
    ];

    // Event while user click for the button
    $scope.redirect = function(province) {
        console.info("province:", province);

    };
}]);