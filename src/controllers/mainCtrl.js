angular.module('StarterAngular')
    .controller('MainController', ['$scope', 'FileUploadService', function ($scope, FileUploadService) {
        $scope.Save = function () {
            FileUploadService.upload($scope.file).then(function (data) {
                console.log(data);
            });
        }

    }]);