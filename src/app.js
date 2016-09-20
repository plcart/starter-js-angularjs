angular.module('StarterAngular', ['ui.router', 'ngResource', 'ngCookies', 'angular-loading-bar','ngMessages'])
    .constant('urlBase', 'http://localhost:64758/api/')
    .constant('formatters', [{ method: "queryCsv", accept: 'text/csv' },
        { method: "queryExcel", accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $urlRouterProvider.otherwise("/login");

        $httpProvider.interceptors.push(function ($q) {
            return {
                'response': function (response) {
                    return response;
                },
                'responseError': function (responseError) {
                    switch (responseError.status) {
                        case 401:
                            window.location.assign("/login");
                            break;
                    }
                    return $q.reject(responseError);
                }
            }
        })

        $stateProvider
            .state('app', {
                url: "/",
                templateUrl: "/views/home.html",
                controller: 'MainController'
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
            })
            .state("user_login", {
                url: '/login',
                templateUrl: '/views/user/user-login.html',
                controller: 'LoginController'
            })
            .state("user_new", {
                url: '/users/new',
                templateUrl: '/views/user/user-new.html',
                controller: 'UserController',
                resolve: {
                    user: [function () {
                        return {
                            Name: "",
                            Email: "",
                            Username: "",
                            Password: ""
                        };
                    }],
                    roles: [function () {
                        return {};
                    }]
                }
            })
            .state("user_role", {
                url: '/users/roles',
                templateUrl: '/views/user/user-role.html',
                controller: 'UserController',
                resolve: {
                    user: ['AuthService', function (AuthService) {
                        return AuthService.current();
                    }],
                    roles: ['AuthService', function (AuthService) {
                        return AuthService.roles();
                    }]
                }
            });

    }).run(['$rootScope', '$http', '$cookies', 'AuthService', function ($rootScope, $http, $cookies, AuthService) {
        var base64 = $cookies.get("starter_user");
        if (base64) {
            $http.defaults.headers.common.Authorization = "Basic " + base64;
            AuthService.current().then(function (d) {
                $rootScope.currentUser = d.data;
            });
        }

    }]); 