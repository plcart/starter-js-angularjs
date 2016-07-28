angular.module('StarterAngular')
    .factory('EnumService', ['$http', 'urlBase', function ($http, urlBase) {
        return {
            getPages: function () {
                return $http.get(urlBase + 'enums/pages', null);
            },
            getMediaTypes: function () {
                return $http.get(urlBase + 'enums/mediatypes', null);
            },
            getLanguages: function () {
                return $http.get(urlBase + 'enums/languages', null);
            }
        };

    }]);