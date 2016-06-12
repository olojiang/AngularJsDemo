/**
 * Created by Hunter on 6/7/2016.
 */
var coreModule = angular.module('coreModule');

coreModule.service("MapHelper", [function () {
  this.plus21 = function (map, key1, key2) {
    if (!map) {
      console.error("plus21(), map must be exists.");
      return;
    }

    var innerMap = {};
    if (map[key1]) {
      innerMap = map[key1];
    } else {
      map[key1] = innerMap;
    }

    this.plus11(innerMap, key2);
  };

  this.plus11 = function (map, key) {
    if (!map) {
      console.error("plus11(), map must be exists.");
      return;
    }

    if (map[key]) {
      map[key] = map[key] + 1;
    } else {
      map[key] = 1;
    }
  };
}]);
