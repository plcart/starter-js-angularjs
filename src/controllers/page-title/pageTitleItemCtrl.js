angular.module('StarterAngular')
    .controller('PageTitleItemController', ['$scope','pageTitle',function ($scope,pageTitle) {
        $scope.page = pageTitle;
    }]);