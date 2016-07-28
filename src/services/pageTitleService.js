angular.module('StarterAngular')
    .factory('PageTitleService', ['urlBase', '$resource', 'ContentNegotiationFactory', function (urlBase, $resource, content) {
        return $resource(urlBase + 'pages/:page/:language', { page: '@Page', language: '@Language' },
            angular.extend(content.build({ page: '@Page', items: null }),
                {
                    'update': { method: "PUT", params: { page: '@Page', language: '@Language', items: null } },
                    'destroy': { method: "DELETE", params: { page: '@Page', language: '@Language', items: null } }
                }));
    }]);
