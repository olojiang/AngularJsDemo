"use strict";

/*
 * Factory service to return object
 * - return httpReq()
 */

angular.module('myModule5', [])
  .factory('httpReq', ['$http',
    function ($http) {
      return {
        sendMessage: function () {
          // Return promise object
          return $http.get('http://it-ebooks-api.info/v1/search/JavaScript');
        }
      };
    }]);