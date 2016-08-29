angular.module('StarterAngular')
    .factory('AuthService', ['$http', '$cookies', 'urlBase', function ($http, $cookies, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                return $http.post(urlBase + 'login', user).then(function (d) {
                    var base64 = window.btoa(user.Username + ':' + user.Password);
                    $cookies.put("starter_user", base64);
                    $http.defaults.headers.common.Authorization = "Basic " + base64;
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