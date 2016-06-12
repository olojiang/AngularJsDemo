"use strict";

/*
 * Directive as element
 */

var myModule4 = angular.module('myModule4', []);
myModule4.directive("myDirective", [function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // E-Element, A-Attribute, C-Class
    directive.template = "<div ng-click='callback()'><h3>{{label}}</h3></div>";

    /*
     * @ Parent to child only, attribute value is mix expression
     * = Parent child, 2 way binding, attribute value is parent scope [key]
     * & for call back function to parent
     */
    directive.scope = {
        label: '=label',
        callback: '&click'
    };

    // directive own controller
    directive.controller = ['$scope', function ($scope) {

    }];

    return directive;
}]);