angular.module('StarterAngular')
    .controller('PageTitleItemController', ['$scope', 'pageTitle', function ($scope, pageTitle) {
        $scope.page = pageTitle;

        $scope.Save = function () {
            $scope.page.$update().then(function (d) {
              $scope.message = "Page Title Updated with success!"  
            });
        }
    }]);