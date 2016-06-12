"use strict";

angular.module('myModule1', [])
  .controller('myController', ['$scope', function ($scope) {
    $scope.add = function (a, b) {
      return a + b;
    };
  }]);