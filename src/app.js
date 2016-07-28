angular.module('StarterAngular', ['ui.router', 'ngResource', 'angular-loading-bar'])
    .constant('urlBase', 'http://localhost:64758/api/')
    .constant('formatters', [{ method: "queryCsv", accept: 'text/csv' },
        { method: "queryExcel", accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

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
                        return PageTitleService.query({ items: 10 });
                    }]
                }
            })
            .state('page_item_edit', {
                url: '/pages/:Page/:Language/edit',
                templateUrl: '/views/page-title/page-title-item.html',
                controller: 'PageTitleItemController',
                resolve: {
                    pageTitle: ['PageTitleService', '$stateParams', function (PageTitleService, $stateParams) {
                        return PageTitleService.get({ page: $stateParams.Page, language: $stateParams.Language });
                    }],
                    highlights: ['PageHighlightService', '$stateParams', function (PageHighlightService, $stateParams) {
                        return PageHighlightService.query({ page: $stateParams.Page, language: $stateParams.Language });
                    }],
                    pages: ['EnumService', function (EnumService) {
                        return EnumService.getPages();
                    }],
                    languages: ['EnumService', function (EnumService) {
                        return EnumService.getLanguages();
                    }],
                    medias: ['EnumService', function (EnumService) {
                        return EnumService.getMediaTypes();
                    }]
                }
            })
            .state('page_item_new', {
                url: '/pages/new',
                templateUrl: '/views/page-title/page-title-item.html',
                controller: 'PageTitleItemController',
                resolve: {
                    pageTitle: [function () {
                        return {
                            Language: "PT_BR",
                            Page: "Home",
                            MediaType: "None"
                        }
                    }],
                    highlights: [function () {
                        return [];
                    }],
                    pages: ['EnumService', function (EnumService) {
                        return EnumService.getPages();
                    }],
                    languages: ['EnumService', function (EnumService) {
                        return EnumService.getLanguages();
                    }],
                    medias: ['EnumService', function (EnumService) {
                        return EnumService.getMediaTypes();
                    }]
                }
            })
            .state('highlight_new', {
                url: '/pages/:Page/:Language/highlights/new',
                templateUrl: '/views/page-highlight/page-highlight-item.html',
                controller: 'PageHighlightItemController',
                resolve: {
                    highlight: [function () {
                        return {
                            Language: "PT_BR",
                            MediaType: "None"
                        }
                    }],
                    languages: ['EnumService', function (EnumService) {
                        return EnumService.getLanguages();
                    }],
                    medias: ['EnumService', function (EnumService) {
                        return EnumService.getMediaTypes();
                    }]
                }
            })
            .state('highlight_edit', {
                url: '/pages/:Page/:Language/highlights/:Id/edit',
                templateUrl: '/views/page-highlight/page-highlight-item.html',
                controller: 'PageHighlightItemController',
                resolve: {
                    highlight: ['PageHighlightService', '$stateParams', function (PageHighlightService, $stateParams) {
                        return PageHighlightService.get({ page: $stateParams.Page, language: $stateParams.Language, id: $stateParams.Id });
                    }],
                    languages: ['EnumService', function (EnumService) {
                        return EnumService.getLanguages();
                    }],
                    medias: ['EnumService', function (EnumService) {
                        return EnumService.getMediaTypes();
                    }]
                }
            });

    });