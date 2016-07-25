angular.module('StarterAngular')
    .factory('PageHighlightService', ['urlBase', '$resource', 'ContentNegotiationFactory', function (urlBase, $resource, content) {
        return $resource(urlBase + 'pages/:page/highlights/:id', { page: '@page', items: '10' },
            content.build({ page: '@id', items: null }));
    }]);