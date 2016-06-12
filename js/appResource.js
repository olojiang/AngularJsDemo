"use strict";

/*
 * Factory service to return object
 * - return resourceReq()
 */

angular.module('myModule6', ['ngResource'])
  .factory('resourceReq', ['$resource',
    function ($resource) {
      // Return Resource object
      // - $resource(url, [paramDefaults], [actions], options);
      return $resource('http://it-ebooks-api.info/v1/search/JavaScript');
    }
  ]);