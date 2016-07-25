angular.module('StarterAngular')
    .controller('PageTitleListController', ['$scope','pageTitles','PageTitleService',function ($scope,pageTitles,PageTitleService) {
        $scope.Pages = pageTitles;
        
        $scope.DownloadCsv= function () {
            PageTitleService.queryCsv({});
        }

        $scope.DownloadExcel= function () {
            PageTitleService.queryExcel({});
        }

        $scope.Delete = function (page) {
            page.$destroy().then(function(d){
                $scope.Pages = PageTitleService.query();
            });
        }

    }]);