/**
 * Created by Hunter on 6/12/2016.
 */
"use strict";

var myModule = angular.module('myModule', ['ui.router']);

myModule.controller("myController", ['$scope', '$state', function ($scope, $state) {
    console.info("$state.go('province');");
    $state.go('province', {title: "test title"});
    // $state.go('provinceDetail', {
    //     ProvinceId: "42"
    // });
}]);

// - bower install angular-ui-router --save
// - <script type="text/javascript" src="app/bower_components/angular-ui-router/release/angular-ui-router.js"></script>

// - Use:
// -   <div ui-view></div>
// -   <div ui-view="viewName"></div>
// - Reference Example:
// -   $state.go('list');  // 指定state名，相当于跳转到 /list
// -   $state.go('list.ProvinceId', {ProvinceId: 42});  // 相当于跳转到 /list/42
// -   <a ui-sref="list">Contacts</a>
// -   <a ui-sref="list.ProvinceId({ProvinceId: 42})">Contact 42</a>
myModule.config(function($stateProvider) {
    $stateProvider
        .state('province', {
            url: '/province',
            templateUrl: '21.list.html',
            controller: 'listController',
            resolve: {
                title: function(){
                    return "province Title";
                }
            },
            onEnter: function(title){
                if(title){
                    console.info("onEntry() title:", title);
                }
            },
            onExit: function(title){
                if(title){
                    console.info("onExit() title:", title);
                }
            },
            data: {
                customData1: 5,
                customData2: "blue"
            }
        })
        .state('province.child', {
            url: "/child/{ProvinceId}",
            templateUrl: '21.list.ProvinceId.html',
            controller: function ($scope, $stateParams, $state) {
                // If we got here from a url of /list/42
                console.info('province.child(), $stateParams.ProvinceId === "42"', $stateParams.ProvinceId === "42");
                $scope.ProvinceId = $stateParams.ProvinceId;

                console.log($state.current.data.customData1); // outputs 5;
                console.log($state.current.data.customData2); // outputs "blue";

                $scope.back = function () {
                    $state.go('province');
                };
            }
        })
        .state('provinceDetail', {
            url: "/provinceDetail/{ProvinceId}",
            templateUrl: '21.list.ProvinceId.html',
            controller: function ($scope, $stateParams, $state) {
                // If we got here from a url of /list/42
                console.info('$stateParams.ProvinceId === "42"', $stateParams.ProvinceId === "42");
                $scope.ProvinceId = $stateParams.ProvinceId;

                $scope.back = function () {
                    $state.go('province');
                };

                $scope.back2 = function () {
                    $state.go('^');
                };
            }
        });
});

myModule.controller('listController', function($scope, $state, $stateParams, title) {
    // $stateParams is an object for the input parameter
    console.info("listController()");
    $scope.title = title;

    $scope.goDetail = function(id) {
        $state.go("provinceDetail", {ProvinceId: id});
    };
});