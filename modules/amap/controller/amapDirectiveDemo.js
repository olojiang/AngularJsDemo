/**
 * Created by Hunter on 4/8/2016.
 */
"use strict";

var myModule = angular.module('myModule', ['mapModule']);

myModule.controller("myController", ['$scope', function ($scope) {
  $scope.data = {
    "Label": [
      {
        "Name": "地点1xxx",
        "Location": "116.36,40.03"
      },
      {
        "Name": "地点2",
        "Location": "116.40,40.04"
      },
      {
        "Name": "地点3",
        "Location": "116.36,40.04"
      }
    ],
    "Polyline": [
      [
        "116.36,40.03",
        "116.40,40.05",
        "116.35,40.03"
      ],
      [
        "116.37,40.04",
        "116.41,40.03",
        "116.37,40.05"
      ]
    ],
    "Driving": [
      [
        "116.36,40.03",
        "116.40,40.05",
        "116.33,40.05",
        "116.43,40.06",
        "116.30,40.06"
      ]
    ]
  };

  $scope.zoomlevel = 13;
  $scope.centerPoint = [116.39, 39.9];
  $scope.centerPointDisplay = JSON.stringify($scope.centerPoint, undefined, 0);

  // Initial data display
  $scope.dataDisplay = JSON.stringify($scope.data, undefined, 4);

  // Displayed data change
  $scope.$watch('dataDisplay', function (newValue, oldValue) {
    if (!newValue) {
      return;
    }

    console.info("newValue:", newValue, "oldValue:", oldValue);
    // $scope.$apply(function(){
    try {
      $scope.data = JSON.parse(newValue);
    } catch (e) {
      console.error(e);
    }
    // });
  });

  $scope.$watch('centerPointDisplay', function (newValue, oldValue) {
    if (!newValue) {
      return;
    }

    console.info("centerPointDisplay(), newValue:", newValue, "oldValue:", oldValue);
    // $scope.$apply(function(){
    try {
      $scope.centerPoint = JSON.parse(newValue);
    } catch (e) {
      console.error(e);
    }
    // });
  });
}]);