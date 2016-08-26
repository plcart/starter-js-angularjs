angular.module('StarterAngular')
    .controller('UserController', ['$scope', '$state', 'AuthService', 'user', 'roles', function ($scope, $state, AuthService, user, roles) {
        $scope.user = user.data || user;
        $scope.roles = roles.data || roles;
        $scope.Save = function () {
            if ($scope.formRegister.$valid)
                AuthService.register($scope.user).then(function (d) {
                    $state.go("user_login");
                }, function (d) {
                    $scope.message = d.data && d.data.Message;
                });
        };

    }]);