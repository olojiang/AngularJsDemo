/**
 * Created by Hunter on 4/3/2016.
 */
"use strict";

var mapModule = angular.module('mapModule', []);

mapModule.directive("amapDisplay", ['AmapWrapper',
  function (AmapWrapper) {
    var directive = {};

    directive.replace = false; // default is true

    directive.restrict = 'A'; // E-Element, A-Attribute, C-Class

    /*
     * @ Parent to child only, attribute value is mix expression
     * = Parent child, 2 way binding, attribute value is parent scope [key]
     * & for call back function to parent
     */
    directive.scope = {
      data: '=data',
      id: '@',
      zoomLevel: '=',
      centerPoint: '='
    };

    /*
     * Data sample:
     */
    /*var data = {
     Label: [
     {
     name:'地点1',
     location:'116.36,40.03'
     },
     {
     name:'地点2',
     location:'116.40,40.05'
     },
     {
     name:'地点3',
     location:'116.35,40.04'
     }
     ],
     Polyline: [[
     '116.36,40.03', '116.40,40.05', '116.35,40.04'
     ]],
     Driving: [[
     '116.36,40.03', '116.40,40.05'
     ]]
     };*/

    function displayData(scope) {
      var data = scope.data;

      if (data) {
          var label = data.Label || [];
        var polyline = data.Polyline || [];
        var driving = data.Driving || [];

        if (scope.map) {
          AmapWrapper.drawMarkers(scope.map, label);
          AmapWrapper.drawLines(scope.map, polyline);
          AmapWrapper.drawDrivePath(scope.map, driving, scope.routeCallback);
        }
      }
    }

    function setZoomLevel(scope) {
      var zoomLevel = scope.zoomLevel;

      if (zoomLevel) {
        if (scope.map) {
          AmapWrapper.setZoomLevel(scope.map, zoomLevel);
        }
      }
    }

    function setCenterPoint(scope) {
      var centerPoint = scope.centerPoint;

      if (centerPoint) {
        if (scope.map) {
          AmapWrapper.setCenterPoint(scope.map, centerPoint);
        }
      }
    }

    directive.link = function (scope, element, attrs) {
      scope.routeCallback = function (status, result) {
        console.info("status:", status, "result:", result);
      };

      // link(), scope to element for data binding, it has scope and its values, manipulate DOM
      scope.$watch('data', function (newValue, oldValue) {
        if (!newValue && newValue === oldValue) {
          return;
        }
        console.info("scope.data, newValue:", newValue, "oldValue:", oldValue);
        var data = scope.data = newValue;

        displayData(scope);
      });

      scope.$watch('zoomLevel', function (newValue, oldValue) {
        if (!newValue && newValue === oldValue) {
          return;
        }
        console.info("scope.zoomLevel, newValue:", newValue, "oldValue:", oldValue);
        var zoomLevel = scope.zoomLevel = newValue;

        setZoomLevel(scope);
      });

      scope.$watch('centerPoint', function (newValue, oldValue) {
        if (!newValue && newValue === oldValue) {
          return;
        }
        console.info("scope.centerPoint, newValue:", newValue, "oldValue:", oldValue);
        var centerPoint = scope.centerPoint = newValue;

        setCenterPoint(scope);
      });

      scope.$watch('id', function (newValue, oldValue) {
        if (!newValue && newValue === oldValue) {
          return;
        }
        console.info("scope.id, newValue:", newValue, "oldValue:", oldValue);
        console.info("amapDisplay, link(), scope:", scope);
        var id = scope.id = newValue;

        var DEFAULT_CENTER = [116.39, 39.9];
        var DEFAULT_ZOOM = 13;

        var zoomLevel = scope.zoomLevel ? scope.zoomLevel : DEFAULT_ZOOM;
        var centerPoint = scope.centerPoint ? scope.centerPoint : DEFAULT_CENTER;

        console.info("zoomLevel:", zoomLevel, "centerPoint:", centerPoint);

        scope.map = AmapWrapper.createMap(id, zoomLevel, centerPoint);

        displayData(scope);
      });
    };

    return directive;
  }]);
