angular.module('StarterAngular')
    .controller('LoginController', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
        $scope.Login = function () {
            if ($scope.formLogin.$valid)
                AuthService.login($scope.user).then(function (d) {
                    $state.go("user_role");
                }, function (d) {
                    $scope.message = "Wrong Username or/and Password."
                })
            return false;
        }

    }]);