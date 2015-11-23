"use strict";

// Create new module
var testModule = angular.module('testModule', []);

// Use existing module
//var testModule = angular.module('testModule');

// Create controller under a new module.
testModule.controller('personController', function($scope, $http, $timeout, $interval) {
    $scope.value1 = 777;
    $scope.value2 = " Go";

    $scope.plus = function(a, b) {
        return a + b;
    };

    $scope.books = [{
        name: "Hadoop",
        price: 58.5
    }, {
        name: "Spark",
        price: 97
    }, {
        name: "Hbase",
        price: 78
    }, {
        name: "Storm",
        price: 88
    }];

    $scope.filterBook = function(item) {
        return item['price'] > 78;
    };

    $http.get('json/Customers.json').success(function(response){
        console.info('json/Customers.json ', response);

        $scope.names = response;
    });

    $scope.addName = function(evt) {
        $scope.name = $scope.name + "!";
    };

    // angular.copy
    $scope.master = {name: 'Hunter', age: 32};
    $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

    //
    $scope.student = {};

    $scope.dateX = new Date();

    $scope.html = '<span color="red">RED</span>';

    // ng-switch
    $scope.switch=2;

    // ng-if, remove the DOM
    $scope.if = true;
    $scope.if2 = false;

    // $watch(), $digest(), $apply()
    $scope.timeX = new Date();
    $scope.updateTime = function() {
        $scope.timeX = new Date();
    };

    document.getElementById('buttonUpdateTime').addEventListener('click', function(evt){
        console.info("Native Click Event");

        // It will not trigger the $watch automatically
        $scope.timeX = new Date();

        // Must do this to allow update automatically.
        $scope.$digest();

        // Or you can do following, $apply => $digest automatically
        $scope.$apply(function() {
            $scope.timeX = new Date();
        });
    });

    // Form - Select
    $scope.selectX = "game";

    // Form - ng-options
    $scope.classmates = [{name: "Jia Li", id: "yunjiali", value: "yunjiali"}, {name: "Guang Qun", id: "liguangqun", value: "liguangqun"}, {name: "Wei Wei", id: "linweiwei", value: "linweiwei"}];
    $scope.selectY = "liguangqun";

    // Form - ng-class
    $scope.getNgPatternClass = function() {
        return $scope.myForm.ngpattern.$valid;
    };

    $scope.getNgPatternInvalid = function() {
        return $scope.myForm.ngpattern.$invalid?"invalid":"";
    };

    // Form - ng-submit
    $scope.myForm2_name = "hunter";
    $scope.myForm2_submit = function() {
        console.info("$scope.myForm2.submit()", $scope.myForm2.name);
    };

    // $timeout
    $timeout(function(){$scope.time3 = new Date();}, 3000, true/*if the function is called within $scope.$apply()*/);

    // $interval
    $interval(function(){$scope.time4 = new Date();}, 1000, 0/*count*/, true/*if the function is called within $scope.$apply()*/);
});

// Customized filter
testModule.filter('myFilter', function(){
    return function(items, start, end) {
        console.info("myFilter, ", items);

        var result = [];
        for(var i in items) {
            if(i>=start && i<end) {
                var item = items[i];
                result.push(item);
            }
        }

        return result;
    }
});