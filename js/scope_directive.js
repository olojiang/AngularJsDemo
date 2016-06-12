"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    $scope.key='Hello';
    $scope.updateFoo = function (newFoo) {
        $scope.key = newFoo;
    };
}]);

myModule.directive("myComponent", [function () {
    var directive = {};
    directive.restrict = 'E'; // E-Element, A-Attribute, C-Class
    directive.templateUrl = 'scopeDirectiveTemplate.html';

    // isolated scope
    /*
     * @ Parent to child only, attribute value is mix expression
     * = Parent child, 2 way binding, attribute value is parent scope [key]
     * & for call back function to parent
     */
    directive.scope = {
        isolatedAttributeFoo: '@attributeFoo',
        isolatedBindingFoo: '=bindingFoo',
        isolatedExpressionFoo: '&'
    };

    directive.link = function (scope, element, attrs) {
        // link(), scope to element for data binding, it has scope and its values, manipulate DOM
        console.info("scope:", scope);

        // When element destroyed, clear memory, etc
        element.on('$destroy', function () {

        });
    };

    return directive;
}]);
