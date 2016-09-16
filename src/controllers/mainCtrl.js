angular.module('StarterAngular')
    .controller('MainController', ['$rootScope', '$scope', '$http', '$cookies', '$state', function ($rootScope, $scope, $http, $cookies, $state) {
        $scope.Logout = function () {
            delete $http.defaults.headers.common.Authorization;
            delete $rootScope.currentUser;
            $cookies.remove('starter_user');
            $state.go("app");
        }
        $scope.getCurrentUser = function () {
            $scope.currentUser = $rootScope.currentUser;
            return $rootScope.currentUser;
        }
    }]);