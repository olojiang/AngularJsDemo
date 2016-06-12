"use strict";

var myModule = angular.module('myModule', []);
var integerRegex = /^\-?\d+$/;

myModule.directive("integer", function () {
    var directive = {};

    // need following when override the control $validate
    directive.require = 'ngModel';

    directive.link = function (scope, element, attrs, ctrl) {
        // link(), scope to element for data binding, it has scope and its values
        ctrl.$validators.integer = function(modelValue, viewValue) {
            if (ctrl.$isEmpty(modelValue)) {
                return false; // Not allow empty
            } else if (integerRegex.test(viewValue)) {
                return true;
            } else {
                return false;
            }
        };
    };

    return directive;
});


var PARENTS = ['Tim', "Simon", "Hunter"];
myModule.directive("parentname", function ($q, $timeout) {
    var directive = {};

    // need following when override the control $validate
    directive.require = 'ngModel';

    directive.link = function (scope, element, attrs, ctrl) {
        // link(), scope to element for data binding, it has scope and its values
        ctrl.$asyncValidators.parentname = function(modelValue, viewValue) {
            var def = $q.defer();

            $timeout(function(){
                if(PARENTS.indexOf(viewValue) !== -1) {
                    def.resolve();
                } else {
                    def.reject();
                }
            }, 2000);

            return def.promise;
        };
    };

    return directive;
});

var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

// Remember attribute name is override-email instead of overrideEmail
myModule.directive("overrideEmail", function () {
    var directive = {};

    // need following when override the control $validate
    directive.require = 'ngModel';

    directive.link = function (scope, element, attrs, ctrl) {
        // link(), scope to element for data binding, it has scope and its values

        if(ctrl && ctrl.$validators.email) {
            ctrl.$validators.email = function(modelValue, viewValue) {
                return EMAIL_REGEXP.test(viewValue);
            };
        }

        return true;
    };

    return directive;
});

myModule.directive("contenteditable", function () {
    var directive = {};

    // need following when override the control $validate
    directive.require = 'ngModel';

    directive.link = function (scope, element, attrs, ctrl) {
        // link(), scope to element for data binding, it has scope and its values

        // when blur, View => Model
        element.on('blur', function(){
            ctrl.$setViewValue(element.html());
        });

        // Load initial model value from dom
        ctrl.$setViewValue(element.html());

        // Model => View
        ctrl.$render = function() {
            element.html(ctrl.$viewValue);
        }
    };

    return directive;
});

myModule.directive("nonStringSelect", function () {
    var directive = {};

    // need following when override the control $validate
    directive.require = 'ngModel';

    directive.link = function (scope, element, attrs, ctrl) {
        // link(), scope to element for data binding, it has scope and its values
        ctrl.$parsers.push(function(value){
            return parseInt(value, 10);
        });
        ctrl.$formatters.push(function(value){
            return value+"";
        });
    };

    return directive;
});


myModule.controller("myController", ['$scope', function ($scope) {
    $scope.master = {};

    $scope.repeatList = [{
        id: "1",
        label: "Label1"
    },{
        id: "2",
        label: "Label2"
    },{
        id: "3",
        label: "Label3"
    }];

    $scope.user = {
        selectOptions:
            {
                id: "2",
                label: "Label2"
            },
        selectCustomized: 3
    };

    $scope.save = function (user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };
}]);
