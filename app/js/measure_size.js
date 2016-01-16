/**
 * Created by Hunter on 1/16/2016.
 */

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', '$timeout', function ($scope, $timeout) {
    $scope.data = "";

    $scope.getSize = function getSize() {
        var item = angular.element(document.querySelectorAll(".textArea")[0]);

        // Include border
        $scope.offsetWidth = item.prop('offsetWidth');
        $scope.offsetHeight = item.prop('offsetHeight');

        // Relative to document
        $scope.offsetLeft = item.prop('offsetLeft');
        $scope.offsetTop = item.prop('offsetTop');

        // No border, no scroll
        $scope.clientWidth = item.prop('clientWidth');
        $scope.clientHeight = item.prop('clientHeight');

        // Computer scroll
        $scope.scrollWidth = item.prop('scrollWidth');
        $scope.scrollHeight = item.prop('scrollHeight');

        // Border
        $scope.clientLeft = item.prop('clientLeft');
        $scope.clientTop = item.prop('clientTop');
    };

    $scope.buttonClicked = function (event) {
        var letterNumber = Math.random() * 1000;
        var i, len, str='';
        for (i = 0, len = letterNumber; i < len; i++) {
            str += "test ";
        }
        $scope.data = str;

        // Method 1: to watch data change, and execute after UI render
        // It will execute a little latter after $scope.$digest() run to update UI
        // - This is east way to execute some code after data change
        //$timeout(function(){
        //    getSize();
        //});
    };

}]);

// Method 2: to watch data change, and execute after UI render
myModule.directive("watchSample", [function () {
    var directive = {};

    directive.link = function (scope, element, attrs) {
        // link(), scope to element for data binding, it has scope and its values, manipulate DOM
        // When element destroyed, clear memory, etc

        scope.$watch(attrs.watchSample, function (value) {
            // Do any thing with the value
            scope.getSize();
        })
    };

    return directive;
}]);


