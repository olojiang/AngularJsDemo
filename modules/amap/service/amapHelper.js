/**
 * Created by Hunter on 4/4/2016.
 */
"use strict";

var mapModule = angular.module('mapModule');

mapModule.service("AmapHelper", function () {
    this.string2Arr = function (string) {
        if (!string) {
            throw new Error('empty string: ', string);
        }
      if (string.length === 2) {
        return string;
      }
        var arr = string.split(',');
        arr = arr.map(function (item) {
            var num = Number(item.trim());

            if (isNaN(num)) {
                throw new Error('type error: ' + item);
            } else {
                return num;
            }
        });

        return arr;
    };
});

