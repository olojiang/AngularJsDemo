/**
 * Created by Hunter on 6/3/2016.
 */
"use strict";

var coreModule = angular.module('coreModule');

coreModule.service("ArrayHelper", [function () {
  this.moveArrayItem = function (sourceArray, targetArray, item) {
    var i = sourceArray.indexOf(item);
    sourceArray.splice(i, 1);
    targetArray.push(item);
  };
}]);
