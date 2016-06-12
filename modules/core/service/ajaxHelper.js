/**
 * Created by Hunter on 5/18/2016.
 */
"use strict";

var coreModule = angular.module('coreModule');

coreModule.service("ajaxHelper", ['notyService', function (notyService) {
    this.isSuccess = function (methodName, data) {
        console.info(methodName + ", data:", data);
        if (data[0] === '<') {
            // It's not found in the back end
            notyService.showError(methodName + "调用失败，后端API不存在");
            return false;
        } else if (data.Code !== 0) {
            // Backend defined error
            notyService.showError(data.Message);
            return false;
        }

        return true;
    };

    this.handleError = function (methodName, error) {
        // In case of network error
        console.error(methodName + ", error:", error);
        notyService.showError(error.status + " : " + error.statusText);

        return true;
    };

    this.defaultErrorHandler = function (methodName) {
        return function (error) {
            this.handleError(methodName, error);
        }.bind(this);
    };

    this.defaultSuccessHandler = function (methodName, successCallback) {
        return function (data) {
            // Demo for handle the server result
            if (this.isSuccess(methodName, data)) {
                if (successCallback) {
                    successCallback(data);
                }
            }
        }.bind(this);
    };

    /**
     * handle promise object for success and error case
     * @param methodName
     * @param promiseObject
     * @param successCallback
     */
    this.handlePromise = function (methodName, promiseObject, successCallback) {
        if (!promiseObject) {
            console.error("Require promiseObject: ", promiseObject);
            return;
        }
        promiseObject.then(
            this.defaultSuccessHandler(methodName, successCallback),
            this.defaultErrorHandler(methodName));

        // Pass on the promise object for more flexible operations
        return promiseObject;
    };
}]);
