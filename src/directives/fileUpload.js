angular.module('StarterAngular')
    .directive('fileUpload', ['$parse', 'FileUploadService', function ($parse, FileUploadService) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileUpload);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        FileUploadService.upload(element[0].files[0]).then(function (x) {
                            modelSetter(scope, x.data['"file"']);
                        });
                    });
                });
            }
        };
    }]);