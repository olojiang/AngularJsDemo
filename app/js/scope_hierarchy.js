var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.factory = 'Factory from $rootScope';
    $scope.name = '1st layer scope, name';
}]);

myModule.controller("childController", ['$scope', function ($scope) {
    $scope.names = ['name1', 'name2', 'name3'];
}]);