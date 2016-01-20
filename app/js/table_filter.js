/**
 * Created by Hunter on 1/19/2016.
 */
var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    /*
     * Table related data
     * - Some of the column can be selected
     * - keys column can not be selected
     */
    $scope.dataList = [
        {value: 'SanjoseWeather', name: 'Sanjose Weather'},
        {value: 'BostonWeather', name: 'Boston Weather'},
        {value: 'WashingtonWeather', name: 'Washington Weather'}
    ];

    var tableHeader = $scope.tableHeader = [
        "station_id", "display_location.full", "weather", "temp_f", "temp_c", "relative_humidity"
    ];

    var keys = $scope.keys = ['station_id', "display_location.full"];

    $scope.tableData = [
        ["KMABOSTO198", "Boston, MA", "Partly Cloudy", 19.4, -7, "47%"],
        ["KMABOSTO100", "Champaign, IL", "Sunny", 34, 2, "47%"],
        ["KMABOSTO101", "Apopka, FL", "Partly Cloudy", 45.9, 13, "15%"],
        ["KMABOSTO102", "Kernersville, NC", "Cloudy", 92.3, 33, "25%"],
        ["KMABOSTO103", "Clermont, FL", "Partly Sunny", 65, 19, "52%"],
        ["KMABOSTO104", "Orchard Park, NY", "Rainy", 70, 21, "85%"],
        ["KMABOSTO105", "Rossville, GA", "Snow", 82, 28, "75%"]
    ];

    /*
     * Initial selection
     */
    $scope.selected = {
            keys: {
                station_id: 'KMABOSTO100',
                "display_location.full": "Champaign, IL"
            },
            column: 'temp_f',
            columnType: 'number'
        } || {};

    var i, len, key;
    $scope.keyIndex = [];
    for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        var index = tableHeader.indexOf(key);
        if(index !== -1) {
            $scope.keyIndex.push(index);
        }
    }

    $scope.isShow = function (rowData) {
        console.info("rowData:", rowData);

        var filter = $scope.external?$scope.external.tableFilter:"";
        if(!filter || filter.length === 0) {
            return true;
        }

        // Ignore case
        filter = filter.toUpperCase();

        var i, len, cell;
        var isShow = false;
        for (i = 0, len = rowData.length; i < len; i++) {
            cell = rowData[i];

            if(String(cell).toUpperCase().indexOf(filter) !== -1) {
                // find it, not need to filter
                isShow = true;
                break;
            }
        }

        return isShow;
    };

    $scope.isKey = function (column) {
        return $scope.keyIndex.indexOf(column)!==-1;
    };

    $scope.isSelectable = function (column) {
        return $scope.keyIndex.indexOf(column)===-1;
    };

    $scope.isSelected = function (rowData, column) {
        var keyIndex = $scope.keyIndex;
        var j, len, index;
        var isSelected = true;

        var selectedKeys = $scope.selected?$scope.selected.keys:false;
        if(!selectedKeys) {
            return false;
        }

        if (!(keyIndex.length > 0)) {
            console.error("Unexpected keyIndex: ", keyIndex);
            return false;
        }

        // Match key indexes
        for (j = 0, len = keyIndex.length; j < len; j++) {
            index = keyIndex[j];
            var columnName = tableHeader[index];

            var selectValue = selectedKeys[columnName];
            var targetValue = rowData[index];
            if(selectValue !== targetValue) {
                isSelected = false;
                break;
            }
        }

        // Match the column
        if( isSelected ) {
            isSelected = $scope.selected.column === tableHeader[column];
        }

        return isSelected;
    };

    $scope.isSelectedRow = function (rowData) {
        var keyIndex = $scope.keyIndex;
        var j, len, index;
        var isSelected = true;

        var selectedKeys = $scope.selected?$scope.selected.keys:false;
        if(!selectedKeys) {
            return false;
        }

        if (!(keyIndex.length > 0)) {
            console.error("Unexpected keyIndex: ", keyIndex);
            return false;
        }

        // Match key indexes
        for (j = 0, len = keyIndex.length; j < len; j++) {
            index = keyIndex[j];
            var columnName = tableHeader[index];

            var selectValue = selectedKeys[columnName];
            var targetValue = rowData[index];
            if(selectValue !== targetValue) {
                isSelected = false;
                break;
            }
        }

        return isSelected;
    };

    $scope.onSelect = function (rowData, columnIndex) {
        var keyIndex = $scope.keyIndex;
        if(keyIndex.indexOf(columnIndex) > -1) {
            return;
        }

        $scope.selected = {};
        var keys = $scope.selected.keys = {};

        var j, len, keyI;
        for (j = 0, len = keyIndex.length; j < len; j++) {
            keyI = keyIndex[j];
            keys[tableHeader[keyI]] = rowData[keyI];
        }

        $scope.selected.column = tableHeader[columnIndex];
        $scope.selected.columnType = rowData[columnIndex].replace?'string':'number';
    };

    $scope.getResult = function() {

        if(!$scope.selected.column || !$scope.data) {
            return "";
        }

        // Schema first
        var schema = $scope.data;

        // Keys
        var str1 = '';
        var str2 = '';
        var keys = $scope.selected.keys;
        var key;
        var j=0;
        for (key in keys) {
            if(j>0) {
                str1+= " AND ";
            }

            var value = keys[key];

            str1+= schema+"."+key + "=" + (value.replace?"\""+value+"\"":value);

            j++;
        }

        // Columns
        var column = $scope.selected.column;
        var columnWithSchema = schema+"."+column;
        str2 = columnWithSchema + ", " + str1;
        var str3 = columnWithSchema + ' ('+ str1 +')';

        return angular.extend( $scope.selected||{}, {
            stringFormat1: str1,
            stringFormat2: str2,
            stringFormat3: str3,
            schema: schema,
            columnWithSchema: columnWithSchema
        }) ;
    }
}]);