var moduleDatatimepicker = angular.module('bigknow.datetimepicker', ['ui.bootstrap.datetimepicker']);

moduleDatatimepicker.directive('datepicker', function(){
    var directive = {};

    directive.restrict="E";
    directive.compile = function(element, attrs) {
        console.info("compile()", attrs);

        var htmlText = "<div class=\"form-group\">"+
            "<label for=\""+attrs['id']+"\">"+attrs['label']+"</label>"+
            "<div class=\"dropdown\">"+
            "<a class=\"dropdown-toggle\" id=\""+attrs['id']+"\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"\">"+
            "<div class=\"input-group\">"+
            "<span class=\"input-group-addon\" ng-click=\"reset('"+attrs['id']+"')\">x</span>"+
            "<input type=\"text-large\" readonly class=\"form-control\" value=\"{{"+attrs['id']+"|date: '"+attrs['datedisplayformat']+"'}}\" placeholder=\""+attrs['label']+"\">"+
            "<span class=\"input-group-addon\">"+
            "<i class=\"glyphicon glyphicon-calendar\"></i>"+
            "</span>"+
            "</div>"+
            "</a>"+
            "<ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\""+attrs['id']+"\">"+
            "<datetimepicker data-ng-model='"+attrs['id']+"'"+
            "data-datetimepicker-config=\"{ startView: '"+attrs['startview']+"', minView: '"+attrs['minview']+"', dropdownSelector: '#"+attrs['id']+"' }\"></datetimepicker>"+
            "</ul>"+
            "</div>"+
            "</div>";

        element.replaceWith(htmlText);

        return function($scope, element, attrs) {
            console.info("link()", $scope, element, attrs);
            $scope.reset = function(id) {
                delete $scope[id];
            };
        };
    };

    return directive;
});