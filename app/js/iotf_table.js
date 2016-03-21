/**
 * Created by Hunter on 3/21/2016.
 */
"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    $scope.loading = false;

    $scope.tableHeaders = [
        {
            name: "Ji Wei",
            description: "Ji Wei is an good developer"
        },
        {
            name: "Yun Jia Li",
            description: "Ji Wei is an good tester"
        }
    ];

    $scope.items = [
        {
            sortable: true,
            header: 'name',
            label: 'Name'
        },
        {
            sortable: true,
            header: 'description',
            label: 'Description'
        }
    ];

    $scope.delItem = function (item) {
        console.info("delItem():", item);
    };

    $scope.selection = {
        areAllSelected: function() {

        },
        toggleSelectAll: function() {

        },
        isSelected: function(item) {

        },
        isAnySelected: function() {

        }
    };
}]);