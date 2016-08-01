angular.module('StarterAngular')
    .controller('PageTitleItemController', ['$scope', 'PageTitleService', 'PageHighlightService', 'FileUploadService', 'pageTitle', 'highlights', 'languages', 'pages', 'medias', '$state',
        function ($scope, PageTitleService, PageHighlightService, FileUploadService, pageTitle, highlights, languages, pages, medias, $state) {
            $scope.page = pageTitle;
            $scope.highlights = highlights;
            $scope.languages = languages.data;
            $scope.pages = pages.data;
            $scope.medias = medias.data;

            $scope.DisplayFileInput = function () {
                return $scope.page.MediaType == 'Image' || $scope.page.MediaType == 'File';
            }

            $scope.MediaChanged = function(){
                return $scope.DisplayFileInput() && $scope.Id && $scope.page.MediaValue && !$scope.page.MediaChange;
            }

            $scope.Save = function () {
                if ($scope.formPageTitle.$valid) {
                    if ($scope.page.Id)
                        $scope.page.$update().then(function (d) {
                            $state.go('page_title');
                        }, function (err) {
                            if (err.data.Message)
                                $scope.message = err.data.Message
                        });
                    else
                        PageTitleService.save({ page: null, language: null }, $scope.page, function (d) {
                            $state.go('page_title');
                        }, function (err) {
                            if (err.data.Message)
                                $scope.message = err.data.Message
                        });
                }
            }

            $scope.Delete = function (highlight) {
                highlight.Page = $state.params;
                highlight.$destroy().then(function (d) {
                    $scope.highlights = PageHighlightService.query({ page: $scope.page.Page, language: $scope.page.Language });
                });
            }
        }]);