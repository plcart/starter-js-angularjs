angular.module('StarterAngular')
    .factory('AuthService', ['$http', '$cookies', 'urlBase', function ($http, $cookies, urlBase) {
        return {
            register: function (user) {
                return $http.post(urlBase + 'register', user);
            },
            login: function (user) {
                var _this = this;
                return $http.post(urlBase + 'login', user).then(function (d) {
                    var auth = 'Digest username="' + user.Username +
                        '", realm="' + d.data.realm +
                        '", nonce="' + d.data.nonce +
                        '", response="' + md5(user.Username + ':' + d.data.realm + ':' + user.Password) + '"';

                    $http.defaults.headers.common.Authorization = auth;
                    $cookies.put("starter_user", window.btoa(auth));
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