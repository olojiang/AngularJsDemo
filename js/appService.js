"use strict";

/*
 Only provider or Constant can be inject into factory
 */

angular.module('myModule3', [])
  .service('myService', ['$window', 'otherService',
    function ($window, otherService) {
      this.showMessage = function (msg) {
        $window.alert(msg);
      };

      this.service = otherService;
    }]);