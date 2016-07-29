angular.module('StarterAngular')
    .controller('PageHighlightItemController', ['$scope', 'PageHighlightService', 'highlight', 'languages', 'medias', '$state',
        function ($scope, PageHighlightService, highlight, languages, medias, $state) {
            $scope.highlight = highlight;
            $scope.medias = medias.data;
            $scope.languages = languages.data;
            $scope.Save = function () {
                $scope.highlight.Page = $state.params;
                if ($scope.highlight.Id)
                    $scope.highlight.$update().then(function (d) {
                        $state.go('page_item_edit', $state.params);
                    }, function (err) {
                        if (err.data.Message)
                            $scope.message = err.data.Message
                    });
                else
                    PageHighlightService.save({}, $scope.highlight, function (d) {
                        $state.go('page_item_edit', $state.params);
                    }, function (err) {
                        if (err.data.Message)
                            $scope.message = err.data.Message
                    });
            }
        }]);