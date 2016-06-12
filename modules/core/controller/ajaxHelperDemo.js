/**
 * Created by Hunter on 5/15/2016.
 */
"use strict";

var coreModule = angular.module('coreModule', []);
angular.module('RP', ['ngResource', 'ui.bootstrap', 'ngRoute', 'coreModule']);

var demoModule = angular.module('demoModule', ['RP']);

demoModule.controller("myController", ['$scope', 'rpSvc', 'ajaxHelper', 'notyService', function ($scope, rpSvc, ajaxHelper, notyService) {

  $scope.handleNoneExistAjax = function () {
    var method = "rpSvc.l2regions()";
    ajaxHelper.handlePromise(method,
      rpSvc.l2regions("四川"), // This is ajax call return promise object
      function (data) {
        // success handler, do any thing for the data
        notyService.showSuccess(data);
      }
    );
  };

  $scope.handleExistingAjax = function () {
    var method = "rpSvc.provinces()";
    ajaxHelper.handlePromise(method,
      rpSvc.provinces(), // This is ajax call return promise object
      function (data) {
        // success handler, do any thing for the data
        notyService.showSuccess(data);
      }
    );
  };
}]);