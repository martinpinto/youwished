// MAIN MODULE
var wishApp = angular.module('youwishedApp', ['ngRoute', 'ngResource']);

// ROUTES
wishApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/components/home/home.htm',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'app/components/home/forecast.html',
            controller: 'wishController'
        })
        .when('/forecast/:days', {
            templateUrl: 'app/components/home/forecast.html',
            controller: 'wishController'
        })
});

// SERVICES
wishApp.service('standardWishService', function() {
    this.city = 'New York, NY';
    this.sorting = 1; // sorting of 1 indicates a sorting by popularity 
});

// CONTROLLERS
wishApp.controller('homeController', ['$scope', 'standardWishService', function($scope, standardWishService) {
    $scope.city = standardWishService.city;
    
    $scope.$watch('city', function() {
        standardWishService.city = $scope.city;
    });
    
}]);

wishApp.controller('wishController', ['$scope', 'standardWishService', '$resource', '$routeParams', function($scope, standardWishService, $resource, $routeParams) {
    $scope.city = standardWishService.city;
    
    $scope.days = $routeParams.days || '2'; // default to 2 
    
    var appid = '829cd2f80080d0cc54367583001a15dd';
    $scope.weatherApi = $resource('http://api.openweathermap.org/data/2.5/forecast/daily?appid=' + appid, { callback: 'JSON_CALLBACK' }, { get: { method: 'JSONP' }});
    
    $scope.weatherResult = $scope.weatherApi.get({ q: $scope.city, cnt: $scope.days, units: 'metric'});
    
    $scope.convertToDate = function convertToDate(dt) {
        return new Date(dt * 1000);
    };
}]);

// DIRECTIVES
wishApp.directive('weatherReport', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/weatherReport.html',
        replace: true,
        scope: {
            
        }
    };
});