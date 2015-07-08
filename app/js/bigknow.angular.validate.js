/**
 * Created by Hunter on 1/29/2015.
 */
bigknow = typeof bigknow !== 'undefined'?bigknow:{};
bigknow['validateModule'] = angular.module('bigknow.validate', []);
bigknow['validateModule'].service('numberService', function(stringService){
    this.numberRange = function(start, end, value) {
        if(stringService.isEmpty(value)) {
            return false;
        }

        if(isNaN(value)) {
            return false;
        } else {
            value = toNumber(value);
        }

        return angular.isNumber(value) && value>=start && value <= end;;
    };

    this.compareNumber = function(start, end) {
        if(stringService.isEmpty(start) || stringService.isEmpty(end)) {
            return false;
        }

        start = toNumber(start);
        if(isNaN(start)) {
            return false;
        }

        end = toNumber(end);
        if(isNaN(end)) {
            return false;
        }

        return end >= start;
    };

    /**
     * Convert to number,
     * @param value
     * @returns {*}
     * - Number
     * - NaN
     */
    function toNumber(value) {
        if(!angular.isNumber(value)) {
            value = Number(value);
        }

        return value;
    }
});

bigknow['validateModule'].service('stringService', function(){
    this.isEmpty = function(value) {
        if(value == "" || typeof value === 'undefined') {
            return true;
        } else {
            return false;
        }
    };

    this.getNumber = function(value) {
        return angular.isNumber(value)? value: Number(value);
    };
});

bigknow['validateModule'].service('dateService', function(){

});