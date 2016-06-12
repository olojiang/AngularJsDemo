/**
 * Created by Hunter on 5/15/2016.
 */
"use strict";

var coreModule = angular.module('coreModule', []);

coreModule.controller("myController", ['$scope', 'notyService', function ($scope, notyService) {
    $scope.config = {
        timeout: null
    };

    $scope.showInfo = function () {
        notyService.showInfo("Test the notyService.showInfo(targetString) method.", Number($scope.config.timeout));
    };

    $scope.showWarning = function () {
        notyService.showWarning("Test the notyService.showWarning(targetString) method.", Number($scope.config.timeout));
    };

    $scope.showError = function () {
        notyService.showError("Test the notyService.showError(targetString) method.", Number($scope.config.timeout));
    };

    $scope.showSuccess = function () {
        notyService.showSuccess("Test the notyService.showSuccess(targetString) method.", Number($scope.config.timeout));
    };

    $scope.showConfirm = function () {
        notyService.showConfirm("Do you want to set the timeout as 3 seconds?", function () {
            // When user chose OK

            // Must use $scope.$apply(), because it's called from jQuery event listener, and angular will not know $scope change automatically.
            $scope.$apply(function () {
                $scope.config.timeout = "3000";
            });
        });
    };
}]);