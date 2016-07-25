angular.module('StarterAngular')
    .factory('PageTitleService', ['urlBase', '$resource', 'ContentNegotiationFactory', function (urlBase, $resource, content) {
        return $resource(urlBase + 'pages/:page', { page: '@PageFormatted', items: '10' },
            angular.extend(content.build({ page: '@PageFormatted', items: null }),
                {
                    'update': { method: "PUT", params: { page: '@PageFormatted', items: null } },
                    'destroy': { method: "DELETE", params: { page: '@PageFormatted', items: null } }
                }));
    }]);
