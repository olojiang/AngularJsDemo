"use strict";

var myModule = angular.module('myModule', ['ui.bootstrap']);
myModule.controller("myController", ['$scope', '$uibModal', function ($scope, $uibModal) {
    console.info("$uibModal:", $uibModal);

    $scope.items = ['test1', 'test2', 'test3', 'test4'];

    $scope.showDialog = function (evt) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modalContent.html',
            controller: 'modalController',
            size: '',               // 'sm', 'lg', 'md'
            backdrop: 'static',     // Do not dismiss while click outside of the dialog
            resolve: {              // parameter to model controller
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(result){
            console.info("result:", result);
            $scope.selectedItem = result;
        }/*OK*/, function(reason){
            console.info("Dismissed reason:", reason);
        }/*Dismiss*/);
    };
}]);