/**
 * Created by Hunter on 1/19/2016.
 */

"use strict";

var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', '$timeout', function ($scope, $timeout) {
    /*
     * Table related data
     * - Some of the column can be selected
     * - keys column can not be selected
     *
     * Input:
     * - schema list
     * - table headers
     * - table data map = schema -> table data
     * - keys string array
     *
     * - Selected:
     * -- Selected schema
     * -- Selected key value pair array
     * -- Selected attribute
     *
     * - Used schema
     *
     * - Filter: optional
     *
     * Output:
     * -- Selected schema
     * -- Selected key value pair array
     * -- Selected attribute
     */
    $scope.schemaList = [
        {value: 'SanjoseWeather', name: 'Sanjose Weather'},
        {value: 'BostonWeather', name: 'Boston Weather'},
        {value: 'WashingtonWeather', name: 'Washington Weather'},
        {value: 'UsedWeather', name: 'Used Weather'},
        {value: 'SingleWeather', name: 'Single Weather'}
    ];

    $scope.tableHeaderMap = {
        SanjoseWeather: ["station_id", "display_location.full", "weather", "temp_f", "temp_c", "relative_humidity"],
        BostonWeather: ["station_id", "display_location.full", "weather2", "temp_f2", "temp_c2", "relative_humidity2"],
        WashingtonWeather: ["station_id", "display_location.full", "weather3", "temp_f3", "temp_c3", "relative_humidity3"],
        UsedWeather: ["station_id", "display_location.full", "weather5", "temp_f5", "temp_c5", "relative_humidity5"],
        SingleWeather: ["station_id", "display_location.full", "weather4", "temp_f4", "temp_c4", "relative_humidity4"]
    };

    $scope.tableDataMap = {
        SanjoseWeather: [
            ["KMABOSTO198", "Boston, MA", "Partly Cloudy", 19.4, -7, "47%"],
            ["KMABOSTO100", "Champaign, IL", "Sunny", 34, 2, "47%"],
            ["KMABOSTO101", "Apopka, FL", "Partly Cloudy", 45.9, 13, "15%"],
            ["KMABOSTO102", "Kernersville, NC", "Cloudy", 92.3, 33, "25%"],
            ["KMABOSTO103", "Clermont, FL", "Partly Sunny", 65, 19, "52%"],
            ["KMABOSTO104", "Orchard Park, NY", "Rainy", 70, 21, "85%"],
            ["KMABOSTO105", "Rossville, GA", "Snow", 82, 28, "75%"]
        ],
        BostonWeather: [
            ["KMABOSTO298", "Boston, MA2", "Partly Cloudy2", 19.4, -7, "47%"],
            ["KMABOSTO200", "Champaign, IL2", "Sunny2", 34, 2, "47%"],
            ["KMABOSTO201", "Apopka, FL2", "Partly Cloudy2", 45.9, 13, "15%"],
            ["KMABOSTO202", "Kernersville, NC2", "Cloudy2", 92.3, 33, "25%"],
            ["KMABOSTO203", "Clermont, FL2", "Partly Sunny2", 65, 19, "52%"],
            ["KMABOSTO204", "Orchard Park, NY2", "Rainy2", 70, 21, "85%"],
            ["KMABOSTO205", "Rossville, GA2", "Snow2", 82, 28, "75%"]
        ],
        WashingtonWeather: [
            ["KMABOSTO398", "Boston, MA3", "Partly Cloudy3", 19.4, -7, "47%"],
            ["KMABOSTO300", "Champaign, IL3", "Sunny3", 34, 2, "47%"],
            ["KMABOSTO301", "Apopka, FL3", "Partly Cloudy3", 45.9, 13, "15%"],
            ["KMABOSTO302", "Kernersville, NC3", "Cloudy3", 92.3, 33, "25%"],
            ["KMABOSTO303", "Clermont, FL3", "Partly Sunny3", 65, 19, "52%"],
            ["KMABOSTO304", "Orchard Park, NY3", "Rainy3", 70, 21, "85%"],
            ["KMABOSTO305", "Rossville, GA3", "Snow3", 82, 28, "75%"]
        ],
        UsedWeather: [
            ["KMABOSTO398", "Boston, MA3", "Partly Cloudy3", 19.4, -7, "47%"],
            ["KMABOSTO300", "Champaign, IL3", "Sunny3", 34, 2, "47%"],
            ["KMABOSTO301", "Apopka, FL3", "Partly Cloudy3", 45.9, 13, "15%"],
            ["KMABOSTO302", "Kernersville, NC3", "Cloudy3", 92.3, 33, "25%"],
            ["KMABOSTO303", "Clermont, FL3", "Partly Sunny3", 65, 19, "52%"],
            ["KMABOSTO304", "Orchard Park, NY3", "Rainy3", 70, 21, "85%"],
            ["KMABOSTO305", "Rossville, GA3", "Snow3", 82, 28, "75%"]
        ],
        SingleWeather: [
            ["KMABOSTO398", "Boston, MA3", "Partly Cloudy3", 19.4, -7, "47%"]
        ]
    };

    $scope.keysMap = {
        SanjoseWeather: ['station_id'],
        BostonWeather: ['station_id', "display_location.full"],
        WashingtonWeather: ["display_location.full"],
        UsedWeather: ["display_location.full"],
        SingleWeather: ['station_id', "display_location.full", "temp_f4"]
    };

    /*
     * Input data will not change
     */
    $scope.selected = /*{
            schema: 'BostonWeather',
            keys: {
                station_id: 'KMABOSTO200',
                "display_location.full": "Champaign, IL2"
            },
            usedSchemas: {
                UsedWeather: {
                    schema: 'UsedWeather',
                    keys: {
                        "display_location.full": "Apopka, FL3"
                    },
                    number: 1
                }
            },
            attribute: 'temp_f2'
        } ||*/ {};

    console.info("$scope.selected:", $scope.selected);

    /*
     * Output data, will change based on user's selection
     */
    $scope.data = $scope.data||{};

    // Default select of schema
    if($scope.selected && $scope.selected.schema) {
        $timeout(function(){
            $scope.data.schema = $scope.selected.schema;
        }, 0);
    } else if($scope.selected && !$scope.selected.schema) {
        $timeout(function(){
            $scope.data.schema = "";
        }, 0);
    }

    /*
     * Setup attributeType for the attribute select
     */
    $scope.$watch('data.attribute', function (newValue, oldValue) {
        $scope.data.attributeType = $scope.getAttributeType($scope.getAttributeValue());
    });

    /**
     * Get attribute type from it's value
     * @param attr
     * @returns {string}
     */
    $scope.getAttributeType = function (attr) {
        return attr.replace?"string":"float"; // TODO float is not accurate
    };

    function init(schema, tableHeader, keys, tableData, tableDataFilter) {
        /*
         * Compute
         * $scope.keyIndex = key index array
         * $scope.attrMap = index -> name
         */
        var i, len, header;
        var keyIndex = $scope.keyIndex = [];
        var keyMap = $scope.keyMap = {}; // index -> key name
        var attrMap = $scope.attrMap = {}; // index -> name
        for (i = 0, len = tableHeader.length; i < len; i++) {
            header = tableHeader[i];
            var index = keys.indexOf(header);
            if
            (index !== -1) {
                $scope.keyIndex.push(i);
                keyMap[header] = i;
            } else {
                attrMap[header] = i;
            }
        }

        /*
         * Compute
         * $scope.additionalAttributes = additional index array
         */
        $scope.additionalAttributes = _.filter(tableHeader, function (value) {
            return keys.indexOf(value) === -1;
        });

        // Default select nothing on keys table
        $scope.data.keysSelected = '';
        $scope.data.keysRowIndex = undefined;
        $scope.data.keys = {};

        // Default select first 1st attribute
        $scope.data=$scope.data||{};
        $scope.data.attribute = $scope.additionalAttributes[0];

        /*
         * Filter table data
         * if tableDataFilter.filter == true
         */
        var j, lenJ;
        if(tableDataFilter.filter) {
            var filterKeys = tableDataFilter.keys;

            $scope.tableData = tableData = _.filter(tableData, function(tableDataRow) {
                // Get data

                var filterValue = null;
                var match=true;
                for (var key in filterKeys) {
                    if (!filterKeys.hasOwnProperty(key)) {
                        continue;
                    }
                    filterValue = filterKeys[key];

                    if( tableDataRow[keyMap[key]] !== filterValue) {
                        match = false;
                        break;
                    }
                }

                // Compare
                return match;
            });
        }

        /*
         * Compute
         * $scope.tableKeys = an array of string, contains all keys for that array
         */
        var tableKeys = [];
        tableData.forEach(function(item, index, array){
            var tableKey;
            var rowKeys = [];

            for (j = 0, lenJ = keyIndex.length; j < lenJ; j++) {
                index = keyIndex[j];

                rowKeys.push(item[index]);
            }
            tableKeys.push(rowKeys);
        });

        $scope.tableKeys = tableKeys;

        /*
         * Select it if the table only has one item
         */
        if(tableData && tableData.length === 1) {
            // Radio button
            $scope.data.keysSelected = JSON.stringify(tableKeys[0]);

            // Select style
            $scope.data.keys = {};
            var keyI;
            for (j = 0, lenJ = keyIndex.length; j < lenJ; j++) {
                keyI = keyIndex[j];

                $scope.data.keys[tableHeader[keyI]] = tableData[0][keyI];
            }

            $scope.data.keysRowIndex = 0;
        }

        /*
         * If there is a selected item,
         * - Set the default radio button selection
         */
        var selected = $scope.selected;
        if(selected && selected.keys && selected.schema === schema) {
            // Selected items on the table
            $scope.data.keysSelected = JSON.stringify(_.map(selected.keys, function(value, key) {
                return value;
            }));

            // Display for the select background in table
            $scope.data.keys = selected.keys;

            // Selected items on the field
            $timeout(function(){
                $scope.data.attribute = selected.attribute;
            }, 0);
        }
    }

    // Collect table data, and compute table keys when schema change
    $scope.$watch('data.schema', function (schema) {
        console.info("schema:", schema);

        if(!schema) {
            return;
        }

        var tableHeader = $scope.tableHeader = $scope.tableHeaderMap[schema] || [];
        var keys = $scope.keys = $scope.keysMap[schema] || [];
        var tableData = $scope.tableData = $scope.tableDataMap[schema] || [];

        /*
         * Filter used schema
         * - If used schema is not the same as current selected schema
         * usedSchemas: {
            UsedWeather: {
                 schema: 'UsedWeather',
                 keys: {
                    "display_location.full": "Apopka, FL3"
                 },
                 number: 1
             }
           }
         */
        var tableDataFilter = {};
        if($scope.selected.usedSchemas) {
            var schemaName, usedSchema;
            for ( schemaName in $scope.selected.usedSchemas) {
                if(!$scope.selected.usedSchemas.hasOwnProperty(schemaName)) {
                    continue;
                }
                usedSchema = $scope.selected.usedSchemas[schemaName];

                // If the used schema is not current selected, skip
                if(schemaName !== schema) {
                    continue;
                }

                var number = usedSchema.number;
                if(schemaName===$scope.selected.schema) {
                    // --1, because it's just edit one of the schema
                    number--;
                }

                // If number>0, it means other than this one used the schema, do not show any of the other keys to user
                if(number>0) {
                    tableDataFilter.filter = true;
                    tableDataFilter.keys=usedSchema.keys;
                }
            }
        }

        /**
         * Based on input maps and schema, initialize the display meta data
         * @type {{keyIndex, attrMap, tableKeys, tableDataFilter}|*}
         * @private
         */
        init(schema, tableHeader, keys, tableData, tableDataFilter);
    });

    /**
     * Filter table row
     * @param rowData
     * @returns {boolean}
     */
    $scope.isShow = function (rowData) {
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

    /**
     * Is row selected
     * @param rowData
     * @param rowIndex
     * @returns {boolean}
     */
    $scope.isSelectedRow = function (rowData, rowIndex) {
        var keyIndex = $scope.keyIndex;
        var j, len, index;
        var isSelected = true;

        var selectedKeys = $scope.data?$scope.data.keys:false;
        if(!selectedKeys) {
            return false;
        }

        if (keyIndex.length === 0) {
            console.error("Unexpected keyIndex: ", keyIndex);
            return false;
        }

        // Match key indexes
        for (j = 0, len = keyIndex.length; j < len; j++) {
            index = keyIndex[j];
            var columnName = $scope.tableHeader[index];

            var selectValue = selectedKeys[columnName];
            var targetValue = $scope.tableData[rowIndex][index];
            if(selectValue === undefined || selectValue !== targetValue) {
                isSelected = false;
                break;
            }
        }

        if(isSelected) {
            $scope.data.keysRowIndex = rowIndex;
        }

        return isSelected;
    };

    /**
     * On keys row selected
     * @param rowData
     * @param rowIndex
     */
    $scope.onSelect = function (rowData, rowIndex) {
        var keyIndex = $scope.keyIndex;

        var keys = {};

        var j, len, keyI;
        for (j = 0, len = keyIndex.length; j < len; j++) {
            keyI = keyIndex[j];
            keys[$scope.tableHeader[keyI]] = $scope.tableData[rowIndex][keyI];
        }

        $scope.data.keysSelected = JSON.stringify(rowData);
        $scope.data.keysRowIndex = rowIndex;

        $scope.data.keys = keys;
    };

    /**
     * Get attribute value
     * @returns {string}
     */
    $scope.getAttributeValue = function () {
        if(!$scope.data) {
            return "";
        }

        var attr = $scope.data.attribute;
        var keysRowIndex = $scope.data.keysRowIndex;
        var tableData = $scope.tableData;
        if(attr && keysRowIndex !== undefined && tableData) {
            var attributeIndex = $scope.attrMap[attr];
            return tableData[Number(keysRowIndex)][Number(attributeIndex)];
        } else {
            return "";
        }
    };

    /**
     * Get the last part of header path
     * @param item
     * @returns {*}
     */
    $scope.getHeaderText = function (item) {
        if(item) {
            var items = item.split(".");
            return items[items.length-1];
        }

        return item;
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
            if(!keys.hasOwnProperty(key)) {
                continue;
            }
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
    };
}]);