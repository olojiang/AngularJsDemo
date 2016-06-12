"use strict";

/*
 Only provider or Constant can be inject into factory
 */

angular.module('myModule2', [])
  .factory('myFactory', ['$log', 'oneOfMyOtherProvider',
    function ($log, oneOfMyOtherProvider) {
      return {
        logObj: $log,
        service: oneOfMyOtherProvider
      };
    }]);