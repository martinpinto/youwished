// ALL OTHER MODULES

// MAIN MODULE
var wishApp = angular.module('youWishedApp', ['ngRoute', 'ngResource']);

// ROUTES
wishApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/modules/home/home.module.htm',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'app/modules/home/forecast.module.html',
            controller: 'wishController'
        })
        .when('/forecast/:days', {
            templateUrl: 'app/modules/home/forecast.module.html',
            controller: 'wishController'
        })
});