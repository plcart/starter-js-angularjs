angular.module('StarterAngular')
    .controller('PageHighlightListController', ['$scope','highlights',function ($scope,highlights) {
        $scope.Highlights = highlights;
    }]);