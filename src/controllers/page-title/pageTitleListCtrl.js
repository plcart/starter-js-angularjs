angular.module('StarterAngular')
    .controller('PageTitleListController', ['$scope','pageTitles',function ($scope,pageTitles) {
        $scope.Pages = pageTitles;
        
    }]);