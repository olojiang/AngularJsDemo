/**
 * Created by Hunter on 6/3/2016.
 */
var coreModule = angular.module('coreModule');

coreModule.service("DateTimeHelper", [function () {

  this.getHourMinuteString = function (hour, minute) {
    return hour.toString().paddingLeft("00") + ":" + minute.toString().paddingLeft("00");
  };

  this.getHourMinuteStringByDate = function (date) {
    return date.getHours().toString().paddingLeft("00") + ":" + date.getMinutes().toString().paddingLeft("00");
  };
}]);
