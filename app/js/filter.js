var myModule = angular.module('myModule', []);
myModule.controller("myController", ['$scope', function ($scope) {
    /*
     * Source data
     */
    $scope.list = [{"ui":null,"name":"Node-RED","fields":{"to":"","cc":"","subject":"","subjectPrefix":true,"url":"http://localhost.com","headers":"{}","username":"test","password":"test","excludeDeviceData":true},"id":"553c6a50-085d-4c0f-b34a-f31e31455d34","type":"node-red","rules":[],"description":"Node-RED integration"},{"ui":null,"name":"newcreateemail","fields":{"to":"test@us.ibm.com","cc":"","subject":"","subjectPrefix":true,"body":"{\"timestamp\":\"{{timestamp}}\",\"tenantId\":\"{{tenantId}}\",\"deviceId\":\"{{deviceId}}\",\"ruleName\":\"{{ruleName}}\",\"ruleDescription\":\"{{ruleDescription}}\",\"ruleCondition\":\"{{ruleCondition}}\",\"message\":\"{{message}\"}","headers":"{}","excludeDeviceData":true},"id":"87ea50d5-bc35-4901-a0db-467d96c2231f","type":"mail","rules":[],"description":""},{"ui":null,"name":"Node-RED new1","fields":{"url":"http://localhost.com","username":"test","password":"test","headers":"{}"},"id":"fc7679a1-59be-4c12-a238-0fa87a7cac43","type":"node-red","rules":null,"description":"Node-RED integration"},{"ui":null,"name":"dao new testaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fields":{"to":"test@us.ibm.com","cc":"daon1@us.ibm.com","subject":"aaa","subjectPrefix":true,"headers":"{}","excludeDeviceData":true},"id":"af021c13-c57c-412c-88f4-c6509a587471","type":"mail","rules":null,"description":"desc1111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},{"ui":null,"name":"IFTTT","fields":{"to":"","cc":"","subject":"","subjectPrefix":true,"key":"nxj0BSeF_CUe_nG3mQhjJ","event":"testevent_test","value1":"aaa","value2":"bbb","value3":"ccc","headers":"{}","excludeDeviceData":true},"id":"d8d98978-618b-49f4-9e5d-ac47499c2f96","type":"ifttt","rules":["821ffd6b-561a-4d58-8d46-e226c64a6f55"],"description":"IFTTT integration"},{"ui":null,"name":"Send email","fields":{"to":"test@test.com","cc":"","subject":"","subjectPrefix":true,"headers":"{}","excludeDeviceData":true},"id":"6fa6ce62-daa4-4e8f-a4a9-730bf3c986b1","type":"mail","rules":null,"description":"desc"},{"ui":null,"name":"Webhook action","fields":{"url":"http://localhost.com","method":"GET","username":"","password":"","headers":"{}","body":"{\"timestamp\":\"{{timestamp}}\",\"tenantId\":\"{{tenantId}}\",\"deviceId\":\"{{deviceId}}\",\"ruleName\":\"{{ruleName}}\",\"ruleDescription\":\"{{ruleDescription}}\",\"ruleCondition\":\"{{ruleCondition}}\",\"message\":\"{{message}}\"}"},"id":"36ef470b-38b7-4b1d-94b8-31836c2418be","type":"webhook","rules":null,"description":"webhook integration action"}];

    console.info("$scope.list:", $scope.list);

    $scope.msg1 = 'angular';
    $scope.msg2 = 'Ji Wei';
}]);

/*
 * Customized filter
 * - return function has name, parameter, data source, other parameters
 * - inner function return data
 */
myModule.filter('hello', function () {
    return function (data) {
        return 'Hello ' + data;
    }
});

/*
 * Customized filter with parameter
 * - return function has name, parameter, data source, other parameters
 * - inner function return data
 */
myModule.filter('hello2', function () {
    return function (data, param1, param2) {
        return 'Data='+data + ', param1=' + param1 + ', param2=' + param2;
    }
});