/**
 * Created by Hunter on 4/1/2016.
 */
"use strict";


var myModuleResource = angular.module('myModuleResource', ['ngResource']);

myModuleResource.factory('Users', function ($resource) {
    return $resource('api/entries/:id');
});

myModuleResource.controller("myController", ['$scope', 'Users', function ($scope, Users) {

}]);