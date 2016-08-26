angular.module('StarterAngular')
    .controller('LoginController', ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.Login = function () {
            if ($scope.formLogin.$valid)
                AuthService.login($scope.user).then(function (d) {
                    
                }, function (d) {
                    $scope.message = "Wrong Username or/and Password."
                })
        }

    }]);