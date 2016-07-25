angular.module('StarterAngular', ['ui.router', 'ngResource'])
    .constant('urlBase', 'http://localhost:64758/api/')
    .constant('formatters', [{ method: "queryCsv", accept: 'text/csv' },
        { method: "queryExcel", accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('app', {
                url: "/",
                templateUrl: "/views/home.html",
                controller: "MainController"
            })
            .state('page_title', {
                url: '/pages',
                templateUrl: '/views/page-title/page-title-list.html',
                controller: 'PageTitleListController',
                resolve: {
                    pageTitles: ['PageTitleService', function (PageTitleService) {
                        return PageTitleService.query();
                    }]
                }
            })
            .state('page_item', {
                url: '/pages/:page',
                templateUrl: '/views/page-title/page-title-item.html',
                controller: 'PageTitleItemController',
                resolve: {
                    pageTitle: ['PageTitleService', '$stateParams', function (PageTitleService, $stateParams) {
                        return PageTitleService.get({ page: $stateParams.page });
                    }]
                }
            })
            .state('highlight_list', {
                url: '/pages/:page/highlights',
                templateUrl: '/views/page-highlight/page-highlight-list.html',
                controller: 'PageHighlightListController',
                resolve: {
                    highlights: ['PageHighlightService', '$stateParams', function (PageTitleService, $stateParams) {
                        return PageTitleService.query({ page: $stateParams.page });
                    }]
                }
            })
            .state('highlight_item', {
                url: '/pages/:page/highlights/:id',
                templateUrl: '/views/page-title/page-title-item.html',
                controller: 'PageTitleItemController',
                resolve: {
                    pageTitle: ['PageTitleService', '$stateParams', function (PageTitleService, $stateParams) {
                        return PageTitleService.get({ page: $stateParams.page });
                    }]
                }
            });

    });