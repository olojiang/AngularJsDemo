"use strict";

var myModule = angular.module('myModule', []);

/**
 * Directive
 * - encapsulate for the widgets in Angular
 * - types
 * -- Element
 * -- Attribute
 * -- CSS
 * -- Comment
 * - template
 * - templateUrl
 * - isolate scope, - for multiple data to show the directive
 */
myModule.directive("userinfo", function () {
    var directive = {};

    directive.restrict = 'E'; // Element
    //directive.template = "directive: {{textToInsert}}";
    directive.templateUrl = 'directiveTemplate.html';

    return directive;
});

myModule.directive("userInfoIsolated", function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // Element
    directive.template = "<div>isolated: directive: {{user.name}}, {{user.age}}</div>";
    //directive.templateUrl = 'directiveTemplate.html';

    // use html user attribute to identify the object to assign to scope name as 'user'
    // isolated scope
    directive.scope = {
        user: '=user'
    };

    return directive;
});

/**
 * compile()
 * - config() function
 * - called once for each directive in html
 * - one time configuration
 * - must return link()
 */
myModule.directive("compileElement", function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // Element
    directive.template = "<div>{{item.label}}<div>";
    //directive.templateUrl = 'directiveTemplate.html';

    // isolated scope
    directive.scope = {
        item: '=attrkey'
    };

    directive.compile = function compile(tElement, tAttrs, transclude) {
        // compile(), when configure for element
        tElement.css('display', 'inline-block');
        tElement.css('border', '1px solid #efefef');
        tElement.css('padding', '5px');

        return function link($scope, element, attrs) {
            // link(), $scope to element for data binding, it has $scope and its values

            // set html will override the template or templateUrl
            //element.html('<div>from the link(): {{$scope.label}}</div>');
            console.info("$scope:", $scope);
            if($scope.item.label === "AAA") {
                element.css('backgroundColor', '#ffff77');
            }
        }
    };

    return directive;
});


/**
 * link()
 * - bind() function
 * - called every time the html bind data from $scope
 */
// Set only link()
myModule.directive("elementLink", function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // Element
    directive.template = "<div>Label: {{item.label}}<div>";
//    directive.templateUrl = 'directiveTemplate.html';

    // isolated scope
    directive.scope = {
        item: '=attrkey'
    };

    directive.link = function ($scope, element, attrs) {
        // link(), $scope to element for data binding, it has $scope and its values
        var item = $scope.item;
        if(item.label === "DDD") {
            element.html("Changed html for DDD");
            element.css('backgroundColor', 'gray');
        }
    };

    return directive;
});

/*
 * Transclude
 * - When you want to warp the children of the element to the child
 */
myModule.directive("elementTransclude", function () {
    var directive = {};

    directive.replace = true; // default is true

    directive.restrict = 'E'; // Element
    directive.template = "<div>Outer: Hello, {{item.label}}, inner: <div ng-transclude></div></div>";
//    directive.templateUrl = 'directiveTemplate.html';

    // isolated scope
    directive.scope = {
        item: '=attrkey'
    };

    directive.transclude = true;

    return directive;
});


myModule.controller("myController", function ($scope) {
    $scope.textToInsert = "Some text from controller.";

    // following is for isolated scope of directive
    $scope.jiwei = {name: "Ji Wei", age: 33};
    $scope.jiali = {name: "Yun Jia Li", age: 32};
    
    // following is for the compile()
    $scope.aaa = {label: "AAA"};
    $scope.bbb = {label: "BBB"};

    // following is for the link() only
    $scope.ccc = {label: "CCC"};
    $scope.ddd = {label: "DDD"};

    // following is for transclude
    $scope.eee = {label: "EEE"};
    $scope.fff = {label: "FFF"};
});