"use strict";
var myModule = angular.module('myModule');
myModule.controller("modalController", ['$scope', '$uibModalInstance', 'items', function ($scope, $uibModalInstance, items) {
    console.info("items:", items);
    $scope.items = items;
    $scope.selected = {
        item: items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('Cancel');
    };
}]);