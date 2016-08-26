angular.module('StarterAngular')
    .factory('AuthService', ['$http', 'urlBase', function ($http, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                return $http.post(urlBase + 'login', user).then(function (d) {
                    $http.defaults.headers.common.Authorization = "Basic " + window.btoa(user.Username + ':' + user.Password);
                    return d;
                });
            },
            current: function () {
                return $http.get(urlBase + 'currentuser', null);
            },
            roles: function () {
                return $http.get(urlBase + 'currentuser/roles', null);
            }
        };
    }]);