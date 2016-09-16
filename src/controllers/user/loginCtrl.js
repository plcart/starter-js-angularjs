angular.module('StarterAngular')
    .controller('LoginController', ['$rootScope', '$scope', '$state', 'AuthService', function ($rootScope, $scope, $state, AuthService) {
        $scope.Login = function () {
            if ($scope.formLogin.$valid)
                AuthService.login($scope.user).then(function (d) {
                    $state.go("user_role");
                    $rootScope.currentUser = d.data;
                }, function (d) {
                    $scope.message = "Wrong Username or/and Password."
                })
            return false;
        }

    }]);