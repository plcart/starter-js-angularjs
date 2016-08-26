angular.module('StarterAngular')
    .factory('AuthService', ['$http', 'urlBase', function ($http, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                return $http.post(urlBase + 'login', user).then(function (d) {
                    // $http.defaults.headers.common.Authorization = "Basic " + window.btoa()
                    return d;
                });
            },
            current: function () {

            },
            roles: function () {

            }
        };
    }]);