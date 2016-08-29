angular.module('StarterAngular')
    .controller('MainController', ['$scope', '$http', '$cookies', function ($scope, $http, $cookies) {
        $scope.Logout = function () {
            delete $http.defaults.headers.common.Authorization;
            $cookies.remove('starter_user');
        }
    }]);