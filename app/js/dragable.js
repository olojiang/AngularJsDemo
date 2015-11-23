"use strict";

var myModule = angular.module('myModule', []);
myModule.directive("myDragable", ['$document', function ($document) {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'A'; // E-Element, A-Attribute, C-Class
    directive.template = "<div ng-transclude></div>";

    directive.transclude = true; //Show inner html into transclude part, use outer scope

    directive.link = function (scope, element, attrs) {
        // link(), scope to element for data binding, it has scope and its values, manipulate DOM
        var startX = 0;
        var startY = 0;
        var x = 0, y = 0;

        // Element basic style setting
        element.css({
            position: 'relative',
            display: 'inline-block',
            padding: '10px',
            border: '1px solid gray',
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        });

        // Element event interaction
        element.on('mousedown', function(event){
            // Prevent default dragging of selected content
            event.preventDefault();

            startX = event.pageX - x;
            startY = event.pageY - y;

            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });

        function mousemove(event) {
            x = event.pageX - startX;
            y = event.pageY - startY;

            element.css({
                top: y+'px',
                left: x + 'px'
            });
        }

        function mouseup(event) {
            $document.off('mouseup');
            $document.off('mousemove');
        }

        // When element destroyed, clear memory, etc
        element.on('$destroy', function () {
            $document.off('mousedown');
            $document.off('mouseup');
            $document.off('mousemove');
        });
    };

    return directive;
}]);

myModule.controller("myController", ['$scope', function ($scope) {

}]);