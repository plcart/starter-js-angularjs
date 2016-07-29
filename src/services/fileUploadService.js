angular.module('StarterAngular')
    .factory('FileUploadService', ['$http', 'urlBase', function ($http, urlBase) {
        return {
            upload: function (data) {
                var fd = new FormData();
                fd.append('file', data);
                return $http.post(urlBase + 'upload', fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                });
            }
        };
    }]);