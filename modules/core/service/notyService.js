/**
 * Created by Hunter on 5/4/2016.
 */

/*
 * Noty service is using jQuery plugin noty to show different kinds of information
 * - The default style of noty is based on bootstrap
 */

"use strict";

var coreModule = angular.module('coreModule');

coreModule.service("notyService", function ($window) {
    function show(noty, _, type, obj, timeout) {
        console.info("* [Noty] " + type, ", msg:", obj, ", timeout:", timeout);
        var options = {
            text: obj.replace && obj.substring ? obj : (JSON.stringify(obj, null, 2).replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')),
            layout: 'topCenter',
            animation: {
                open: 'animated bounceInLeft', // jQuery animate function property object
                close: 'animated bounceOutRight', // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            },
            type: type, // alert, warning, error, success, information
            maxVisible: 15
        };

        if(timeout) {
            _.extend(options, {timeout: timeout});
        }
        noty(options);
    }

    var noty = $window.noty;
    var _ = $window._;

    this.showError = function showError(obj, timeout) {
        show(noty, _, 'error', obj, timeout);
    };

    this.showInfo = function showInfo(obj, timeout) {
        show(noty, _, 'information', obj, timeout);
    };

    this.showWarning = function showWarning(obj, timeout) {
        show(noty, _, 'warning', obj, timeout);
    };

    this.showSuccess = function showSuccess(obj, timeout) {
        show(noty, _, 'success', obj, timeout);
    };

    this.showConfirm = function showConfirm(text, callback) {
        noty({
            text: text,
            buttons: [
                {addClass: 'btn btn-primary', text: 'Ok', onClick: function($noty) {

                    // this = button element
                    // $noty = $noty element

                    $noty.close();
                    // noty({text: 'You clicked "Ok" button', type: 'success'});

                    callback();
                }
                },
                {addClass: 'btn btn-danger', text: 'Cancel', onClick: function($noty) {
                    $noty.close();
                    // noty({text: 'You clicked "Cancel" button', type: 'error'});
                }
                }
            ]
        });
    };
});
