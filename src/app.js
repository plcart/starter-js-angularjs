angular.module('StarterAngular', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('app', {
                url: "/",
                templateUrl: "views/partial.html",
                controller:"MainController"
            });

    });