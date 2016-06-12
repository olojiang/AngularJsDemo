/**
 * Created by Hunter on 3/21/2016.
 */
"use strict";

//angular.module('myModule.translate', [])
//    .provider('test', ['translationCN', 'translationEN', function (translationCN, translationEN) {
//        this.$get = function () {
//            return {
//                providercn: translationCN,
//                provideren: translationEN
//            };
//        };
//    }]);
//
//angular.module('myModule.translate')
//    .constant('translationEN',{"100001":"Login","100002":"Register"});

var myModule = angular.module('myModule', ['pascalprecht.translate']);

myModule.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    name: 'Name',
    description: 'Description'
  });
  $translateProvider.translations('cn', {
    name: '名称',
    description: '描述'
  });
  //默认语言
  $translateProvider.preferredLanguage('en');
});

myModule.directive("translateLabel", ['$translate', function ($translate) {
  var directive = {};
  directive.restrict = 'A';

  /*
   * @ Parent to child only, attribute value is mix expression
   * = Parent child, 2 way binding, attribute value is parent scope [key]
   * & for call back function to parent
   */
  directive.scope = {
    translateLabel: '='
  };

  directive.link = function (scope, element, attrs, ctrl) {
    // link(), scope to element for data binding, it has scope and its values, manipulate DOM
    // When element destroyed, clear memory, etc
    var label = $translate.instant(scope.translateLabel);
    element.text(label);
  };

  return directive;
}]);


myModule.controller("myController", ['$scope', '$translate', function ($scope, $translate) {
  $scope.loading = false;

  $scope.items = [
    {
      name: "Ji Wei",
      description: "Ji Wei is an good developer"
    },
    {
      name: "Yun Jia Li",
      description: "Ji Wei is an good tester"
    }
  ];

  $scope.tableHeaders = [
    {
      sortable: true,
      visible: true,
      header: 'name',
      label: 'name'
    },
    {
      sortable: true,
      visible: true,
      header: 'description',
      label: 'description'
    }
  ];

  $scope.switchLanguage = function (lang) {
    $translate.use(lang);
  };

  $scope.delItem = function (item) {
    console.info("delItem():", item);
  };

  $scope.selection = {
    areAllSelected: function () {

    },
    toggleSelectAll: function () {

    },
    isSelected: function (item) {

    },
    isAnySelected: function () {

    }
  };
}]);