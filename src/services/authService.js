angular.module('StarterAngular')
    .factory('AuthService', ['$http', '$cookies', 'urlBase', function ($http, $cookies, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                return $http({
                    method: "OPTIONS",
                    url: urlBase + 'login',
                    data: 'username=harthur26&password=3yskmdbU&grant_type=password'
                }).then(function (d) {
                    console.log(d);
                    // var base64 = window.btoa(user.Username + ':' + user.Password);
                    // $cookies.put("starter_user", base64);
                    // $http.defaults.headers.common.Authorization = "Basic " + base64;
                    // return d;
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