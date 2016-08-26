angular.module('StarterAngular')
    .controller('UserController', ['$scope', '$state', 'AuthService', 'user', function ($scope, $state, AuthService, user) {
        $scope.user = user.data || user;

        $scope.Save = function () {
            if ($scope.formRegister.$valid)
                AuthService.register($scope.user).then(function (d) {
                    $state.go("user_login");
                }, function (d) {
                    $scope.message = d.data && d.data.Message;
                });;
        };

    }]);