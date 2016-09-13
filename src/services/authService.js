angular.module('StarterAngular')
    .factory('AuthService', ['$http', '$cookies', 'urlBase', function ($http, $cookies, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                return $http.post(urlBase + 'login', 'username='+user.Username+'&password='+user.Password+'&grant_type=password')
                    .then(function (d) {
                        console.log(d);
                        var base64 = window.btoa(d.data.access_token);
                        $cookies.put("starter_user", base64);
                        $http.defaults.headers.common.Authorization = "Bearer " + d.data.access_token;
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