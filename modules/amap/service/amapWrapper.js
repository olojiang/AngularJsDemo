/**
 * Created by Hunter on 4/5/2016.
 */
"use strict";

var mapModule = angular.module('mapModule');

mapModule.service('AmapWrapper', ['$window', 'AmapHelper', function ($window, AmapHelper) {

  function mapString2Array(point) {
    return AmapHelper.string2Arr(point);
  }

  /*
   * Constant area
   */
  var DEFAULT_CENTER = [116.39, 39.9];
  var DEFAULT_ZOOM = 13;

  /**
   * Create map object
   * @param containerId
   * @param zoomLevel
   * @param centerPoint
   * @returns {AMap.Map}
   */
  this.createMap = function (containerId, zoomLevel, centerPoint) {
    var AMap = $window.AMap;

    var map = new AMap.Map(containerId, {
      zoom: zoomLevel || DEFAULT_ZOOM
    });

    // Toolbar and Scale
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
      var toolBar = new AMap.ToolBar();
      var scale = new AMap.Scale();
      map.addControl(toolBar);
      map.addControl(scale);
    });

    // Zoom level
    map.setZoom(zoomLevel || DEFAULT_ZOOM);

    // Center
    if (centerPoint) {
      map.setCenter(centerPoint || DEFAULT_CENTER);
    }

    return map;
  };

  /**
   * Set center for the map
   * @param map
   * @param centerPoint
   */
  this.setCenterPoint = function (map, centerPoint) {
    map.setCenter(centerPoint);
  };

  /**
   * Set zoom level
   * @param map
   * @param zoomLevel
   */
  this.setZoomLevel = function (map, zoomLevel) {
    map.setZoom(zoomLevel);
  };

  /**
   * Draw new markers or update existing markers
   * @param map
   * @param newMarkers
   */
  this.drawMarkers = function (map, newMarkers) {
    if (!map) {
      throw new Error('expect map not empty');
    }

    if (!newMarkers) {
      throw new Error('expect markers data array not empty');
    }

    var AMap = $window.AMap;

    // Merge existing makers and new Markers,
    //   to find out still valid existing markers
    //   and to find out new markers
    var existingMarkers = map.markers || [];
    var drawMarkers = [];

    var j, lenJ, marker;
    var existMarkerIndex = {};
    var existMarkerLength = existingMarkers.length;

    for (j = 0, lenJ = newMarkers.length; j < lenJ; j++) {
      marker = newMarkers[j];
      marker.Location = AmapHelper.string2Arr(marker.Location);

      var k, lenK, existMarker;
      var find = false;
      for (k = 0, lenK = existMarkerLength; k < lenK; k++) {
        existMarker = existingMarkers[k];

        // Note: only judge the location, NOT judge the name, because it may be more complex, but useless
        if (JSON.stringify(existMarker.Location) === JSON.stringify(marker.Location) && existMarker.Name === marker.Name) {
          // Find existing marker the same as new markers, do not need to create new marker any more
          existMarkerIndex[k] = true;

          find = true;
          break;
        }
      }

      if (!find) {
        // New marker
        drawMarkers.push(marker);
      }
    }

    // Add add all new markers, in the end
    var i, len, label, arr;
    map.markers = map.markers || [];
    for (i = 0, len = drawMarkers.length; i < len; i++) {
      var markerObj = {};

      label = drawMarkers[i];
      arr = label.Location;

      var content = "<div class='point'>" + label.Name + "</div>";

      // Marker icon, with hover tooltip
      marker = new AMap.Marker({
        position: arr,
        title: label.Name
      });
      marker.setMap(map);

      markerObj.pose = marker;

      // Just label display in front
      marker = new AMap.Marker({
        position: arr,
        content: content,
        offset: new AMap.Pixel(10, -10)
      });

      marker.setMap(map);

      markerObj.Label = marker;
      angular.extend(markerObj, label);

      // Add the markerObject to map, for update case
      map.markers.push(markerObj);
    }

    // Remove some un-used markers
    var markers = map.markers;
    for (i = existMarkerLength - 1; i >= 0; i--) {
      if (!existMarkerIndex[i]) {
        // not exist any more

        // remove from map
        marker = markers[i];
        var mark = marker.pose;
        mark.setMap();
        mark = marker.Label;
        mark.setMap();

        // remove from marker list
        markers.splice(i, 1);
      }
    }
  };

  /**
   * Draw lines on map
   * - Each line is an array of point
   * @param map
   * @param newLines
   */
  this.drawLines = function (map, newLines) {
    if (!map) {
      throw new Error('expect map not empty');
    }

    if (!newLines) {
      throw new Error('expect lines data array not empty');
    }

    var AMap = $window.AMap;

    // Merge existing lines and new lines,
    //   to find out still valid existing lines
    //   and to find out new lines
    var existingLines = map.lines || [];
    var drawLines = [];

    var j, lenJ, line;
    var existLineIndex = {};
    var existLineLength = existingLines.length;

    for (j = 0, lenJ = newLines.length; j < lenJ; j++) {
      line = newLines[j];

      // Convert types
      newLines[j] = line = line.map(mapString2Array);

      var k, lenK, existLine;
      var find = false;
      for (k = 0, lenK = existLineLength; k < lenK; k++) {
        existLine = existingLines[k];

        // Note: only judge the location
        if (JSON.stringify(existLine.points) === JSON.stringify(line)) {
          // Find existing line the same as new line, do not need to create new line any more
          existLineIndex[k] = true;

          find = true;
          break;
        }
      }

      if (!find) {
        // New line
        drawLines.push(line);
      }
    }

    // Add add all new markers, in the end
    var i, len;
    map.lines = map.lines || [];
    for (i = 0, len = drawLines.length; i < len; i++) {
      line = drawLines[i];
      var poly = new AMap.Polyline({
        zIndex: 1,
        path: line,
        strokeColor: '#aa7777',
        strokeOpacity: 0.7,
        strokeWeight: 3,
        strokeStyle: 'solid' // solid or dashed
      });

      poly.setMap(map);

      angular.extend(poly, {points: line});

      // Add the poly to map, for update case
      map.lines.push(poly);
    }

    // Remove some un-used markers
    var lines = map.lines;
    for (i = existLineLength - 1; i >= 0; i--) {
      if (!existLineIndex[i]) {
        // not exist any more

        // remove from map
        line = lines[i];
        line.setMap();

        // remove from line list
        lines.splice(i, 1);
      }
    }
  };

  /**
   * Draw DrivePath on map
   * - Each line is an array of point
   * - Must to be 2 of them
   * @param map
   * @param newLines
   * @param callback
   */
  this.drawDrivePath = function (map, newLines, callback) {
    if (!map) {
      throw new Error('expect map not empty');
    }

    if (!newLines) {
      throw new Error('expect lines data array not empty');
    }

    var AMap = $window.AMap;

    // Merge existing lines and new lines,
    //   to find out still valid existing lines
    //   and to find out new lines
    var existingLines = map.drivings || [];
    var drawLines = [];

    var j, lenJ, line;
    var existLineIndex = {};
    var existLineLength = existingLines.length;

    for (j = 0, lenJ = newLines.length; j < lenJ; j++) {
      line = newLines[j];

      // Convert types
      newLines[j] = line = line.map(mapString2Array);

      var k, lenK, existLine;
      var find = false;
      for (k = 0, lenK = existLineLength; k < lenK; k++) {
        existLine = existingLines[k];

        // Note: only judge the location
        if (JSON.stringify(existLine.points) === JSON.stringify(line)) {
          // Find existing line the same as new line, do not need to create new line any more
          existLineIndex[k] = true;

          find = true;
          break;
        }
      }

      if (!find) {
        // New line
        drawLines.push(line);
      }
    }

    // Add add all new path, in the end
    var i, len;
    map.drivings = map.drivings || [];
    AMap.plugin(['AMap.Driving'], function (line) {
      for (i = 0, len = drawLines.length; i < len; i++) {
        // Driving line should only has 2 points
        line = drawLines[i];

        if (line.length < 2) {
          throw new Error('expect line has at least 2 points');
        }

        // 实例化Driving
        //          var driving= new AMap.Driving({city: '北京市'});
        var driving = new AMap.Driving({
          map: map,
          city: '北京市',
          policy: AMap.DrivingPolicy.LEAST_TIME
        });

        if (!callback) {
          console.info("No callback, driving.search()");
        }

        // - 2 points API
        // driving.search(line[0], line[2], callback);

        // - Multiple points API
        var firstPoint = line[0];
        var lastPoint = line[line.length - 1];

        // Construct waypoints
        var opts = {waypoints: []};
        if (line.length > 18) {
          console.error("Do not expect driving points of path larger than 18, ", line);
        }

        if (line.length > 2) {
          var k, lenK, point;
          for (k = 1, lenK = line.length; k < lenK - 1; k++) {
            point = line[k];
            opts.waypoints.push(new AMap.LngLat(point[0], point[1]));
          }
        }

        console.info("driving.search() firstPoint:", firstPoint, "lastPoint:", lastPoint, "opts:", opts);
        driving.search(firstPoint, lastPoint, opts, callback);

        // Store points in line
        angular.extend(driving, {points: line});

        // Add the driving to map, for update case
        map.drivings.push(driving);
      }
    });

    // Remove some un-used lines
    var lines = map.drivings;
    for (i = existLineLength - 1; i >= 0; i--) {
      if (!existLineIndex[i]) {
        // not exist any more

        // remove from map
        line = lines[i];
        line.clear();

        // remove from line list
        lines.splice(i, 1);
      }
    }
  };
}]);