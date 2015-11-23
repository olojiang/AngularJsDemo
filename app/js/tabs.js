"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {

}]);

myModule.directive("myTabs", [function () {
    var directive = {
    };

    directive.replace = true; // default is true

    directive.restrict = 'E'; // E-Element, A-Attribute, C-Class
    directive.templateUrl = 'myTabsTemplate.html';

    directive.transclude = true; //Show inner html into transclude part, use outer scope

    // directive own controller
    directive.controller = ['$scope', function ($scope) {
        var panes = $scope.panes = [];

        $scope.select = function (pane) {
            angular.forEach(panes, function (value, key) {
                value.selected = false;
            });
            pane.selected = true;
        };

        /**
         * It's function for child directive to add themselves
         * @param pane
         */
        this.addPane = function (pane) {
            if(panes.length === 0) {
                $scope.select(pane);
            }
            $scope.panes.push(pane);
        };
    }];

    return directive;
}]);

// Create
myModule.directive("tab", [function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // E-Element, A-Attribute, C-Class
    directive.templateUrl = 'tabTemplate.html';

    directive.transclude = true; //Show inner html into transclude part, use outer scope

    directive.require = ['^myTabs']; // require = '^parentController'

    // isolatedScopeVariable: '=attributeName' => $scope[isolatedScopeVariable] = $scopeParent[attributeValue], = is & + @
    // scopeVariable: '@attributeName' => $scope[scopeVariable] = attributeValue, attributeValue can be string or expression, top => down
    // scopeVariable: '&attributeName' => let attribute value evaluated with outer scope, attributeValue is string, down => top
    directive.scope = {
        title: '@'
    };

    directive.link = function (scope, element, attrs, controllers) {
        // link(), scope to element for data binding, it has scope and its values, manipulate DOM
        var myTabs = controllers[0];
        myTabs.addPane(scope);
    };

    return directive;
}]);
