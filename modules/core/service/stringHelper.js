/**
 * Created by Hunter on 6/3/2016.
 */
var coreModule = angular.module('coreModule');

// Provide more for native String
String.prototype.paddingLeft = function (paddingValue) {
  return String(paddingValue + this).slice(-paddingValue.length);
};

// String format() based on {0}, {1}
// - Example: "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

coreModule.service("StringHelper", [function () {
  this.sortString = function (str1, str2) {
    if (str1 > str2) {
      return 1;
    } else if (str1 < str2) {
      return -1;
    } else {
      return 0;
    }
  };

  this.timeFormat = "2015-09-26T{0}:00+08:00";
}]);
